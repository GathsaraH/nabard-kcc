// components/CommonForm.js
import { Grid , Typography } from '@mui/material';
import React, { useState } from 'react';
const DefaultForm = ({ fields, onSubmit , headings ,  title , onClick }) => {
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
  return (
    <form onSubmit={handleSubmit}>
        {headings.map((heading, index) => (
        <div key={index}>
          <Typography variant="h5">{heading}</Typography>
          <Grid container px={4} py={4} columns={12} spacing={3}>
            {groupedFields[heading].map((field) => (
              <Grid item xs={12} sm={4} key={field.name}>
                <label htmlFor={field.name}>{field.label}:</label>
                {field.type === 'select' ? (
                  <select
                    id={field.name}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className='form-input'
                  >
                    {field.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
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
          </Grid>
        </div>
      ))}
      <div className='flex justify-end p-4'>
        <button type="submit" className='btn btn-lg mt-5 btn-success' onClick={onClick}>{title}</button>
      </div>
    {/* <Grid container px={4} py={4} columns={12} spacing={3}>
    {headings && headings.length > 0 && (
          <Grid item xs={12}>
            {headings.map((heading, index) => (
              <Typography variant="h5" key={index}>
                {heading}
              </Typography>
            ))}
          </Grid>
        )}
      {fields.map((field) => (
        <Grid item xs={12} sm={4} key={field.name}>
            <label htmlFor={field.name}>{field.label}:</label>
            {field.type === 'select' ? (
              <select
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className='form-input'
              >
                {field.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
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
    </Grid>
              <div className='flex justify-end p-4'>
    <button type="submit" className='btn btn-lg mt-5 btn-success' onClick={onClick}>{title}</button>
              </div> */}
  </form>
  );
};

export default DefaultForm;
