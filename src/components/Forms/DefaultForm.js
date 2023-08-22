// components/CommonForm.js
import {
  Grid,
  IconButton,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { BsArrowRight } from "react-icons/bs";
import { HrTag } from "src/constants/ResponsiveClassName";
import CardContainer from "../Card/CardContainer";
import ImageUploader from "../Input/ImageUploader/ImageUploader";
import { AiOutlineDown } from "react-icons/ai";
import DatePickerInput from "../Input/DatePicker/DatePickerInput";
import { validateField } from "./FormValidation";




const textFieldSize = {
  style: {
    height: 40,
    // width: 220
  },
}
const labelSize = {
  style: {
    fontSize: 14,
    margin: `-4px 0 0 0px`,
    marginRight: 2
    // marginBottom: '10px'
  },
}



/**
 * A customizable form component.
 *
 * @param {Object[]} fields - An array of field objects with configuration for each input field.
 * @param {Function} onSubmit - A callback function to handle form submission.
 * @param {string[]} headings - An array of headings to group fields under each heading.
 * @param {string} title - The title of the form.
 * @returns {JSX.Element} - JSX representation of the form component.
 */

const DefaultForm = ({
  fields,
  onSubmit,
  headings,
  title,
  onChange,
  children,
  onClick,
  hierarchyType,
}) => {
  const initialFormData = {};
  const initialErrors = {};
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(initialErrors);
  const initialLevel =
    hierarchyType === "Stakeholder" ? "Ministry" : "Head Office";
  const [inputFieldHierarchy, setInputFieldHierarchy] = useState({
    level: ` ${initialLevel}`,
    data: {},
    inputErrors: { level2: "", level3: "", level4: "", level5: "" },
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
  const handleDateChange = (name, date) => {
    // Set the form data for the changed field
    setFormData((prevData) => ({
      ...prevData,
      [name]: date,
    }));

    // Clear the error message for the field
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));

    // If "Reporting Period To" field is changing, perform validation
    if (name === "ReportingPeriodTo") {
      const fromValue = formData.ReportingPeriodFrom;
      if (fromValue && date && date < fromValue) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          ReportingPeriodTo: "Reporting Period To cannot be before Reporting Period From.",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          ReportingPeriodTo: "",
        }));
      }
    }
  };

  const handleChange = (e) => {
    // const { name, value } = e.target;
    // setFormData((prevData) => ({
    //   ...prevData,
    //   [name]: value,
    // }));

    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));

    onChange((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear the error message for the field
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));

    // onChange && onChange(name, newValue);
  };  

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {};

    fields.forEach((field) => {
      const error = validateField(field.name, formData[field.name],fields);
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

    // if (validateForm()) {
    //   onSubmit(formData);
    //   // setFormData(initialFormData);
    //   setErrors(initialErrors);
    // }
    if (validateForm()) {
      const formDataWithHierarchy = {
        ...formData,
        inputFieldHierarchy: inputFieldHierarchy.data,
      };

      onSubmit(formDataWithHierarchy);
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
      const nextLevel = prevHierarchy.data.hasOwnProperty("level2")
        ? prevHierarchy.data.hasOwnProperty("level3")
          ? prevHierarchy.data.hasOwnProperty("level4")
            ? "level5"
            : "level4"
          : "level3"
        : "level2";

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

  useEffect(() => {
    onChange((prevData) => ({
      ...prevData,
      ['inputFieldHierarchy']: inputFieldHierarchy.data,
    }));

  }, [inputFieldHierarchy])


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
  const shouldShowHierarchy =
    headings.includes("Bank Hierarchy") ||
    headings.includes("Stakeholder Hierarchy");

  return (
    <form onSubmit={handleSubmit}>
      {/* {console.log(inputFieldHierarchy)} */}
      {headings.map((heading) => (
        <div key={heading.name}>
          <div className="grid lg:grid-cols-2 mt-2 ml-3 p-3">
            <span className="mr-5 text-primary font-bold">{heading}</span>
          </div>
          {heading && <HrTag />}
          <Grid container px={4} py={4} columns={12} spacing={5}>
            {groupedFields[heading].map((field) =>
              field.type === "file" ? (
                <Grid item xs={12} sm={6} key={field.name}>
                  <ImageUploader file={file} onChange={uploadSingleFile} />
                </Grid>
              ) : field.type === "checkbox" ? (
                <Grid item xs={12} sm={3} key={field.name}>
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
                      <label htmlFor={field.name} className="ml-2">
                        {field.label}
                      </label>
                    </div>
                  </CardContainer>
                  {errors[field.name] && (
                    <p className="text-base text-danger mt-1">
                      {errors[field.name]}
                    </p>
                  )}
                </Grid>
              ) : (
                <Grid item xs={12} sm={4} md={4} lg={4} xl={4} key={field.name}>
                  {field.type === "select" ? (
                    <>
                      <FormControl
                        fullWidth
                        variant="outlined"
                        className="from-input w-full"
                      >
                        <InputLabel sx={labelSize.style} htmlFor={field.name} className="input">
                          {field.label}
                        </InputLabel>
                        <Select
                          id={field.name}
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleChange}
                          label={field.label}
                          sx={{
                            fontSize: 12,
                            height: 40,
                          }}
                          IconComponent={AiOutlineDown}
                        >
                          {field.options.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </>
                  ) : field.type === "textarea" ? (
                    <TextField
                      fullWidth
                      id={field.name}
                      multiline
                      rows={5}
                      name={field.name}
                      value={formData[field.name]}
                      label={field.label}
                      placeholder={field.placeholder}
                      onChange={handleChange}
                      variant="outlined"

                    />
                  ) : field.type === "datepicker" ? (
                    <DatePickerInput
                      value={formData[field.name] || null}
                      label={field.label}
                      onChange={(date) => handleDateChange(field.name, date)}
                    />
                  ) : (
                    <TextField
                      fullWidth
                      type={field.type}
                      id={field.name}
                      label={field.label}
                      placeholder={field.placeholder}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      variant="outlined"
                      InputProps={textFieldSize}
                      InputLabelProps={labelSize}

                    />
                  )}
                  {errors[field.name] && (
                    <p className="text-base text-danger mt-1">
                      {errors[field.name]}
                    </p>
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
                      handleInputChange("level2", evnt.target.value)
                    }
                    value={inputFieldHierarchy.data.level2}
                    required
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
                      handleInputChange("level3", evnt.target.value)
                    }
                    value={inputFieldHierarchy.data.level3}
                    required
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
                      handleInputChange("level4", evnt.target.value)
                    }
                    value={inputFieldHierarchy.data.level4}
                    required
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
                    <div className="col-start-5 col-end-10 xl:w-auto">
                      <TextField
                        id="outlined-basic"
                        label="Level 5"
                        name="level5"
                        onChange={(evnt) =>
                          handleInputChange("level5", evnt.target.value)
                        }
                        value={inputFieldHierarchy.data.level5}
                        required
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
              )}
            </div>
          </Grid>
        </div>
      )}

      {children && children}
      <div className="flex justify-end p-4">
        <button type="button">
          <span
            className="btn btn-lg mt-5 mr-4"
            style={{ backgroundColor: "#EEE", color: "#696969" }}
            onClick={onClick}
          >
            Cancel
          </span>
        </button>
        <button type="submit">
          <span className="btn btn-lg mt-5 btn-primary">
            {title} <BsArrowRight className="ml-2" />
          </span>
        </button>
      </div>
    </form>
  );
};

export default DefaultForm;

// add an arrow icon on dropdown or select
