import React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { TextField } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
/**
 * A custom select input component.
 *
 * @param {string} label - The label for the select input.
 * @param {any} value - The selected value of the select input.
 * @param {any} name - The  name of the select input.
 * @param {Array<{ value: any, label: string }>} options - The array of options for the select input.
 * @param {function(any): void} onChange - The callback function that gets called when the select input value changes.
 * @param {string} className - The class name for the container div.
 * @param {string} width - The width of the select input (e.g., '100px', '50%', etc.).
 * @param {string} height - The height of the select input (e.g., '30px', 'auto', etc.).
 * @returns {JSX.Element} The JSX representation of the SelectInput component.
 */
const SelectInput = ({
  label,
  value,
  name,
  options,
  onChange,
  className,
  width = '100%', // Default width if not provided
  height = '20px', // Default height if not provided
}) => {
  /**
   * Handles the change event of the select input.
   *
   * @param {React.ChangeEvent<any>} event - The change event.
   */
 

  return (
    <div className={className} style={{ width, height }}>
      <Box sx={{ minWidth:140 }}>
        <TextField
          label={label}
          name={name}
          variant="outlined"
          size="small"
          select
          fullWidth
          value={value}
          onChange={onChange}
          SelectProps={{
            IconComponent: KeyboardArrowDownIcon, // Use ArrowDropDownIcon as the custom icon
          }}
        >
          {/* Rendering menu items based on the provided options */}
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </div>
  );
};

export default SelectInput;
