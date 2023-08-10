// components/CommonForm.js
import { Grid, IconButton, TextField , Select, MenuItem, TextareaAutosize, InputLabel, FormControl } from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { BsArrowRight } from "react-icons/bs";
import { HrTag } from "src/constants/ResponsiveClassName";
import CardContainer from "../Card/CardContainer";
import ImageUploader from "../Input/ImageUploader/ImageUploader";
import { AiOutlineDown } from "react-icons/ai";
import { getAllDistrictApi } from "src/services/Attributes/AttributeService";

/**
 * A customizable form component.
 *
 * @param {Object[]} fields - An array of field objects with configuration for each input field.
 * @param {Function} onSubmit - A callback function to handle form submission.
 * @param {string[]} headings - An array of headings to group fields under each heading.
 * @param {string} title - The title of the form.
 * @returns {JSX.Element} - JSX representation of the form component.
 */


const DefaultForm = ({ fields, onSubmit, headings, title, onChange, children , onClick , hierarchyType ,states,
  districts,
  subDistricts,
  villages}) => {
    const [selectedState, setSelectedState] = useState(""); // State to hold selected state ID
    const [fetchedDistricts, setFetchedDistricts] = useState([]); // State to hold fetched districts
  const initialFormData = {};
  const initialErrors = {};
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(initialErrors);
  const initialLevel = hierarchyType === 'Stakeholder' ?'Ministry':'Head Office';
  const [inputFieldHierarchy, setInputFieldHierarchy] = useState({
    level: ` ${initialLevel}`,
    data: {},
    inputErrors: { level2: "", level3: "", level4: "" , level5 :"" },
  });
  const [file, setFile] = useState("");
  // const classes = useStyles();

  function uploadSingleFile(e) {
    const { name } = e.target;
    e.preventDefault();
    setFile(URL.createObjectURL(e.target.files[0]));
    onChange((prevData) => ({
      ...prevData,
      [name]: URL.createObjectURL(e.target.files[0]),
    }));
  }

 


  if (!Array.isArray(fields)) {
    // Handle the case when "fields" is not an array (you can show an error message or return null).
    return null;
  }
  fields.forEach((field) => {
    initialFormData[field.name] = "";
    initialErrors[field.name] = "";
  });



  const handleChange = (e) => {
    console.log(e.target);
    // const { name, value } = e.target;
    // setFormData((prevData) => ({
    //   ...prevData,
    //   [name]: value,
    // }));
    // onChange((prevData) => ({
    //   ...prevData,
    //   [name]: value,
    // }));
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    // If the changed field is the state select input
    if (name === "State") {
      setSelectedState(value); // Update selected state ID
      // Fetch districts based on the selected state ID
      getAllDistrictApi(newValue)
        .then((response) => {
          setFetchedDistricts(response.dataList); // Update fetched districts
        })
        .catch((error) => {
          console.error("Error fetching districts:", error);
        });
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));

    // Clear the error message for the field
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));

    onChange && onChange(name, newValue);
  };

  const validateField = (name, value) => {
  const field = fields.find((f) => f.name === name);

  if (field?.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
    return `${field.label} is required.`;
  }

  if (field?.minLength && typeof value === 'string' && value.length < field.minLength) {
    return `${field.label} must be at least ${field.minLength} characters long.`;
  }

  if (field?.maxLength && typeof value === 'string' && value.length > field.maxLength) {
    return `${field.label} must not exceed ${field.maxLength} characters.`;
  }

  return "";
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
      // setFormData(initialFormData);
      setErrors(initialErrors);
    }
  };
  // Function to group fields based on headings
  const groupedFields = {};
  headings.forEach((heading) => {
    groupedFields[heading] = fields.filter(
      (field) => field.heading === heading,
    );
  });

  const handleAddInputFieldHierarchy = () => {
    setInputFieldHierarchy((prevHierarchy) => {
      // Check if all levels (level2, level3, level4) are already present in the data object
      const allLevelsPresent =
        prevHierarchy.data.hasOwnProperty("level2") &&
        prevHierarchy.data.hasOwnProperty("level3") &&
        prevHierarchy.data.hasOwnProperty("level4") &&
        prevHierarchy.data.hasOwnProperty("level5");

      // If all levels are already present, return the previous hierarchy without any changes
      if (allLevelsPresent) {
        return prevHierarchy;
      }

      // Determine the next level to add (level2, level3, level4 or level5)
      const nextLevel =
        prevHierarchy.data.hasOwnProperty("level2")
          ? prevHierarchy.data.hasOwnProperty("level3")
          ?prevHierarchy.data.hasOwnProperty("level4")
            ? "level5"
            :"level4"
            : "level3"
          : "level2"

      // Update the data object with the new level
      const updatedHierarchy = {
        ...prevHierarchy,
        data: {
          ...prevHierarchy.data,
          [nextLevel]: "",
        },
      };

      return updatedHierarchy;
    });
  };


  const handleRemoveInputFieldsHierarchy = () => {
    setInputFieldHierarchy((prevHierarchy) => {
      const updatedHierarchy = { ...prevHierarchy };
      const lastLevel = Object.keys(updatedHierarchy.data).pop(); // Get the last level (level2, level3, or level4)

      // Delete the last level data and errors
      delete updatedHierarchy.data[lastLevel];
      updatedHierarchy.inputErrors[lastLevel] = "";

      return updatedHierarchy;
    });
  };

  const handleInputChange = (name, value) => {
    setInputFieldHierarchy((prevHierarchy) => ({
      ...prevHierarchy,
      data: {
        ...prevHierarchy.data,
        [name]: value,
      },
    }));
  };
  const shouldShowHierarchy = headings.includes('Bank Hierarchy') || headings.includes('Stakeholder Hierarchy');

 
  return (
    <form onSubmit={handleSubmit}>
      {headings.map((heading) => (
        <div key={heading.name}>
          <div className="grid lg:grid-cols-2 mt-2 ml-3">
            <span className="mr-5 text-primary font-bold">
              {heading}
            </span>
          </div>
          <HrTag />
          <Grid container px={4} py={4} columns={12} spacing={3}>
            {groupedFields[heading].map((field) =>
              field.type === "file" ? (
                <Grid item xs={12} sm={5} key={field.name}>
                <ImageUploader file={file} onChange={uploadSingleFile} />
                </Grid>
              ) : 
              field.type === "checkbox" ? (
                <Grid item xs={12} sm={4} key={field.name}>
                  <CardContainer shadow={"shadow-lg"}>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={field.name}
                      name={field.name}
                      checked={formData[field.name]}
                      onChange={handleChange}
                      className="form-checkbox h-5 w-5 text-primary border-gray-300 rounded"
                    />
                    <label htmlFor={field.name} className="ml-2">{field.label}</label>
                  </div>
                  </CardContainer>
                  {errors[field.name] && (
                    <p className="text-base text-danger mt-1">{errors[field.name]}</p>
                  )}
                </Grid>
              )
              :
              (
                <Grid item xs={12} sm={4} key={field.name}>
                  {field.type === "select" ? (
                    <>
      <FormControl fullWidth variant="outlined" className="from-input">
                  <InputLabel htmlFor={field.name} className="input">{field.label}</InputLabel>
                  {/* <Select
                    id={field.name}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    label={field.label}
                    // style={{ height: '40px' }}
                    IconComponent={AiOutlineDown}
                  >
                    {field.options.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select> */}
                  <Select
                      id={field.name}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      label={field.label}
                      IconComponent={AiOutlineDown}
                    >
                      {field.name === "State"
                        ? states.map((state) => (
                            <MenuItem key={state.value} value={state.value}>
                              {state.label}
                            </MenuItem>
                          ))
                        : field.name === "District"
                        ? districts.map((district) => (
                            <MenuItem key={district.value} value={district.value}>
                              {district.label}
                            </MenuItem>
                          ))
                        : field.name === "SubDistrict"
                        ? subDistricts.map((subDistrict) => (
                            <MenuItem key={subDistrict.value} value={subDistrict.value}>
                              {subDistrict.label}
                            </MenuItem>
                          ))
                        : field.name === "Village"
                        ? villages.map((village) => (
                            <MenuItem key={village.value} value={village.value}>
                              {village.label}
                            </MenuItem>
                          ))
                        : // Handle other select options if needed
                          field.options.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                    </Select>
                </FormControl>
                    </>
                  ) : field.type === "textarea" ? (
                    <FormControl fullWidth>
      <InputLabel >{field.label}</InputLabel>
                    <TextareaAutosize
                    id={field.name}
                    // label={field.label}
                    minRows={3}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="form-input col-md-offset-6"
                    sx={{
                      padding: '10.5px 14px',
                      fontSize: '0.875rem',
                      fontFamily: 'Montserrat',
                      fontWeight: 500,
                      border: '1px solid #ced4da',
                      borderRadius: '4px',
                      resize: 'vertical',
                    }}
                  />
                  </FormControl>
                  ) : (
                    <TextField
                    type={field.type}
                    id={field.name}
                    label={field.label}
                    placeholder={field.placeholder}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    variant="outlined"
                    className="form-input"
                    InputProps={{
                      style: {
                        padding: '10.5px 14px', // Adjust padding values as needed
                        height: '55px', // Set the desired height
                      },
                    }}
                  />
                  )}
                  {errors[field.name] && (
                    <p className="text-base text-danger mt-1" >{errors[field.name]}</p>
                  )}
                </Grid>
              ),
            )}
            <HrTag />



          </Grid>
        </div>
      ))}
      {shouldShowHierarchy && (
        <div>
          <Grid container px={4} py={4} columns={12} spacing={3}>
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  className="grid lg:grid-cols-12 m-2 gap-5"
                >
                  <div className="col-start-1 col-end-6 xl:w-auto">
                    <input
                      type="text"
                      className="form-control block w-full px-4 py-2 text-base font-montserrat font-medium text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded"
                      id="exampleFormControlInput3"
                      placeholder="Level 1"
                      value={inputFieldHierarchy.level}
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
                      style={{ backgroundColor: "red" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                  <div className="col-start-8 col-end-9"></div>

                  {inputFieldHierarchy.data.hasOwnProperty("level2") && (
                    <div className="col-start-2 col-end-7 xl:w-auto">
                      <TextField
                        id="outlined-basic"
                        label="Level 2"
                        name="level2"
                        onChange={(evnt) =>
                          handleInputChange(index, "level2", evnt.target.value)
                        }
                        value={inputFieldHierarchy.data.level2}
                        required
                        InputProps={{
                          style: {
                            fontSize: "0.875rem",
                            fontFamily: "Montserrat",
                            fontWeight: "500",
                          },
                        }}
                        InputLabelProps={{
                          className: "common-Font-Family",
                        }}
                        error={inputFieldHierarchy.inputErrors.level2}
                        variant="outlined"
                        size="small"
                        className="w-full"
                      />
                      {inputFieldHierarchy.inputErrors.level2 && (
                        <span className="errorMessageStyle">
                          {inputFieldHierarchy.inputErrors.level2}
                        </span>
                      )}
                    </div>
                  )}

                  {inputFieldHierarchy.data.hasOwnProperty("level3") && (
                    <div className="col-start-3 col-end-8 xl:w-auto">
                      <TextField
                        id="outlined-basic"
                        label="Level 3"
                        name="level3"
                        onChange={(evnt) =>
                          handleInputChange(index, "level3", evnt.target.value)
                        }
                        value={inputFieldHierarchy.data.level3}
                        required
                        InputProps={{
                          style: {
                            fontSize: "0.875rem",
                            fontFamily: "Montserrat",
                            fontWeight: "500",
                          },
                        }}
                        InputLabelProps={{
                          className: "common-Font-Family",
                        }}
                        error={inputFieldHierarchy.inputErrors.level3}
                        variant="outlined"
                        size="small"
                        className="w-full"
                      />
                      {inputFieldHierarchy.inputErrors.level3 && (
                        <span className="errorMessageStyle">
                          {inputFieldHierarchy.inputErrors.level3}
                        </span>
                      )}
                    </div>
                  )}

                  {inputFieldHierarchy.data.hasOwnProperty("level4") && (
                    <div className="col-start-4 col-end-9 xl:w-auto">
                      <TextField
                        id="outlined-basic"
                        label="Level 4"
                        name="level4"
                        onChange={(evnt) =>
                          handleInputChange(index, "level4", evnt.target.value)
                        }
                        value={inputFieldHierarchy.data.level4}
                        required
                        InputProps={{
                          style: {
                            fontSize: "0.875rem",
                            fontFamily: "Montserrat",
                            fontWeight: "500",
                          },
                        }}
                        InputLabelProps={{
                          className: "common-Font-Family",
                        }}
                        error={inputFieldHierarchy.inputErrors.level4}
                        variant="outlined"
                        size="small"
                        className="w-full"
                      />
                      {inputFieldHierarchy.inputErrors.level4 && (
                        <span className="errorMessageStyle">
                          {inputFieldHierarchy.inputErrors.level4}
                        </span>
                      )}
                    </div>
                  )}
                  {hierarchyType !== "Stakeholder" && (
                      <>
                      {inputFieldHierarchy.data.hasOwnProperty("level5") && (
                    <div className="col-start-4 col-end-9 xl:w-auto">
                      <TextField
                        id="outlined-basic"
                        label="Level 5"
                        name="level5"
                        onChange={(evnt) =>
                          handleInputChange(index, "level5", evnt.target.value)
                        }
                        value={inputFieldHierarchy.data.level5}
                        required
                        InputProps={{
                          style: {
                            fontSize: "0.875rem",
                            fontFamily: "Montserrat",
                            fontWeight: "500",
                          },
                        }}
                        InputLabelProps={{
                          className: "common-Font-Family",
                        }}
                        error={inputFieldHierarchy.inputErrors.level4}
                        variant="outlined"
                        size="small"
                        className="w-full"
                      />
                      {inputFieldHierarchy.inputErrors.level5 && (
                        <span className="errorMessageStyle">
                          {inputFieldHierarchy.inputErrors.level5}
                        </span>
                      )}
                    </div>
                  )}
                      </>
                  )
                  
      }
                </div>

          </Grid>
        </div>
      )}

      {children && children}
      <div className="flex justify-end p-4">
      <button type="button" >
          <span className="btn btn-lg mt-5 mr-4" style={{backgroundColor:'#EEE' , color:'#696969'}} onClick={onClick} >Cancel</span>
        </button>
        <button type="submit" >
          <span className="btn btn-lg mt-5 btn-primary" >{title} <BsArrowRight className="ml-2" /></span>
        </button>
      </div>
    </form>
  );
};

export default DefaultForm;


// add an arrow icon on dropdown or select
