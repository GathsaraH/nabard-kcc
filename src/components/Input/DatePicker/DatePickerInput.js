import React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box } from "@mui/material";

/**
 * A dynamic date picker component.
 *
 * @param {string} label - The label for the date picker input.
 * @param {Date | null} value - The selected date value for the date picker.
 * @param {function(Date | null): void} onChange - The callback function that gets called when the date picker value changes.
 * @param {string} [props.className] - The optional className for the wrapper div.
 * @param {string} [props.width='100%'] - The width of the wrapper div.
 * @param {string} [props.height='100%'] - The height of the wrapper div.
 * @returns {JSX.Element} The JSX representation of the DatePickerInput component.
 */
const DatePickerInput = ({
  label,
  value,
  onChange,
  className,

}) => {
  return (
    <div className={className}>
      <Box sx={{ minWidth: 120 }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}
        >
          <div className="date-pick">
            <DatePicker
              label={label}
              value={value}
              onChange={onChange}
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  size="small"
                  {...params}  
                  InputLabelProps={{
                    style: { fontSize: 12 }, // Adjust the font size as needed
                  }}             
                
                />
              )}
            />
          </div>
        </LocalizationProvider>
      </Box>
    </div>
  );
};

export default DatePickerInput;
