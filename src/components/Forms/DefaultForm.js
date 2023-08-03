// components/CommonForm.js
import { Grid, TextField , IconButton } from '@mui/material';
import React, { useState } from 'react';
import { ColorConstants } from 'src/constants/ColorConstants';
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useTranslation } from 'react-i18next';
const DefaultForm = ({ fields, onSubmit , headings , title , onClick }) => {
  const {t} = useTranslation();
  if (!Array.isArray(fields)) {
    // Handle the case when "fields" is not an array (you can show an error message or return null).
    return null;
  }
  const initialFormData = {};
  const initialErrors = {};

  fields.forEach((field) => {
    initialFormData[field.name] = '';
    initialErrors[field.name] = '';
  });

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(initialErrors);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateField = (name, value) => {
    const field = fields.find((f) => f.name === name);

    if (field?.required && !value.trim()) {
      return `${field.label} is required.`;
    }

    if (field?.minLength && value.length < field.minLength) {
      return `${field.label} must be at least ${field.minLength} characters long.`;
    }

    if (field?.maxLength && value.length > field.maxLength) {
      return `${field.label} must not exceed ${field.maxLength} characters.`;
    }

    return '';
  };

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {};

    fields.forEach((field) => {
      const error = validateField(field.name, formData[field.name]);
      newErrors[field.name] = error;
      if (error) {
        formIsValid = false;
      }
    });

    setErrors(newErrors);
    return formIsValid;
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    // eslint-disable-next-line prefer-destructuring
    const file = files[0]; // Get the first file selected (you can handle multiple files if needed)
    setFormData((prevData) => ({
      ...prevData,
      [name]: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
      setFormData(initialFormData);
      setErrors(initialErrors);
    }
  };
   // Function to group fields based on headings
   const groupedFields = {};
   headings.forEach((heading) => {
     groupedFields[heading] = fields.filter((field) => field.heading === heading);
   });
   const [inputFieldHierarchy, setInputFieldHierarchy] = useState([
    {
      level: 'Head Office',
      data: { level2: '', level3: '', level4: '' },
      inputErrors: { level2: '', level3: '', level4: '' },
    },
  ]);
  const handleAddInputFieldHierarchy = () => {
    
    setInputFieldHierarchy((prevHierarchy) => [
      ...prevHierarchy,
      {
        level: 'Head Office',
        data: { level2: '', level3: '', level4: '' },
        inputErrors: { level2: '', level3: '', level4: '' },
      },
    ]);
  };

  const handleRemoveInputFieldsHierarchy = () => {
    if (inputFieldHierarchy.length > 1) {
      setInputFieldHierarchy((prevHierarchy) => prevHierarchy.slice(0, -1));
    }
  };

  const handleInputChange = (index, name, value) => {
    setInputFieldHierarchy((prevHierarchy) =>
      prevHierarchy.map((item, i) =>
        i === index ? { ...item, data: { ...item.data, [name]: value } } : item
      )
    );
  };

  return (
    <form onSubmit={handleSubmit}>
        {headings.map((heading, index) => (
        <div key={index}>
           <div className="grid lg:grid-cols-2 m-3">
                              <span
                                className="subheading-Font-Family p-4"
                                style={{ color: ColorConstants.primaryColor , fontWeight: '700' }}
                              >
                                {heading}
                              </span>
                            </div>
                            <div className="w-auto m-3">
                              <hr style={{ color: "#000000" }}></hr>
                            </div>
          <Grid container px={4} py={4} columns={12} spacing={3}>
            {groupedFields[heading].map((field) => (
                field.type === 'file' ? (
                  <Grid item xs={12} sm={4} key={field.name}>
                    <label htmlFor={field.name}>{field.label}:</label>
                    <input
                      type="file"
                      id={field.name}
                      name={field.name}
                      onChange={handleFileChange}
                    />
                    {errors[field.name] && <p style={{ color: 'red' }}>{errors[field.name]}</p>}
                  </Grid>
                ) : 
              <Grid item xs={12} sm={4} key={field.name}>
                <label htmlFor={field.name}>{field.label}</label>
                {field.type === 'select' ? (
                  <>
                  <select
                    id={field.name}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className='form-input'
                    placeholder={`Enter + ${field.name}`}
                  >
                    {field.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  </>
                  
                ) : field.type === 'textarea' ? (
                  <textarea
                    id={field.name}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="form-input"
                  />
                ) : (
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="form-input"
                  />
                )}
                {errors[field.name] && <p style={{ color: 'red' }}>{errors[field.name]}</p>}
              </Grid>
            ))}
            

      <div className="w-auto m-3">
        <hr style={{ color: '#000000' }}></hr>
      </div>

      {headings.includes('Bank Hierarchy') && inputFieldHierarchy.map((item, index) => (
        <div key={index} className="grid lg:grid-cols-12 m-5 mt-6 gap-5">
          <div className="col-start-1 col-end-6 xl:w-auto">
            <input
              type="text"
              className="form-control block w-full px-4 py-2 text-base font-montserrat font-medium text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded"
              id="exampleFormControlInput3"
              placeholder="Level 1"
              value={item.level}
              disabled
            />
          </div>

          <div className="col-start-6 col-end-7 text-right">
                                    <IconButton
                                      onClick={handleAddInputFieldHierarchy}
                                      aria-label="delete"
                                      className="text-white"
                                      style={{ backgroundColor: "green" }}
                                    >
                                      <AddIcon />
                                    </IconButton>
                                  </div>
          <div className="col-start-7 col-end-8">
            <IconButton
              onClick={handleRemoveInputFieldsHierarchy}
              aria-label="delete"
              className="text-white"
              style={{ backgroundColor: 'red' }}
            >
              <DeleteIcon/>
            </IconButton>
          </div>
          <div className="col-start-8 col-end-9"></div>

          {inputFieldHierarchy.length > 1 && (
            <div className="col-start-2 col-end-7 xl:w-auto">
              <TextField
                id="outlined-basic"
                label="Level 2"
                name="level2"
                onChange={(evnt) => handleInputChange(index, 'level2', evnt.target.value)}
                value={item.data.level2}
                required
                InputProps={{
                  style: {
                    fontSize: '0.875rem',
                    fontFamily: 'Montserrat',
                    fontWeight: '500',
                  },
                }}
                InputLabelProps={{
                  className: 'common-Font-Family',
                }}
                error={item.inputErrors.level2}
                variant="outlined"
                size="small"
                className="w-full"
              />
              {item.inputErrors.level2 && (
                <span className="errorMessageStyle">{item.inputErrors.level2}</span>
              )}
            </div>
          )}

          {inputFieldHierarchy.length > 2 && (
            <div className="col-start-3 col-end-8 xl:w-auto">
              <TextField
                id="outlined-basic"
                label="Level 3"
                name="level3"
                onChange={(evnt) => handleInputChange(index, 'level3', evnt.target.value)}
                value={item.data.level3}
                required
                InputProps={{
                  style: {
                    fontSize: '0.875rem',
                    fontFamily: 'Montserrat',
                    fontWeight: '500',
                  },
                }}
                InputLabelProps={{
                  className: 'common-Font-Family',
                }}
                error={item.inputErrors.level3}
                variant="outlined"
                size="small"
                className="w-full"
              />
              {item.inputErrors.level3 && (
                <span className="errorMessageStyle">{item.inputErrors.level3}</span>
              )}
            </div>
          )}

          {inputFieldHierarchy.length > 3 && (
            <div className="col-start-4 col-end-9 xl:w-auto">
              <TextField
                id="outlined-basic"
                label="Level 4"
                name="level4"
                onChange={(evnt) => handleInputChange(index, 'level4', evnt.target.value)}
                value={item.data.level4}
                required
                InputProps={{
                  style: {
                    fontSize: '0.875rem',
                    fontFamily: 'Montserrat',
                    fontWeight: '500',
                  },
                }}
                InputLabelProps={{
                  className: 'common-Font-Family',
                }}
                error={item.inputErrors.level4}
                variant="outlined"
                size="small"
                className="w-full"
              />
              {item.inputErrors.level4 && (
                <span className="errorMessageStyle">{item.inputErrors.level4}</span>
              )}
            </div>
          )}
        </div>
      ))}
          </Grid>
        </div>
      ))}
      <div className='flex justify-end p-4'>
        <button type="submit" className='btn btn-lg mt-5 btn-success' onClick={onClick}>{title}</button>
      </div>

  </form>
  );
};

export default DefaultForm;
