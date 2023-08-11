import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import React from 'react';

/**
 * A custom radio button group component.
 *
 * @param {string} name - The name for the radio button group.
 * @param {boolean} row - Determines if the radio buttons should be displayed in a row.
 * @param {boolean} value - The current selected value of the radio button group.
 * @param {function(boolean): void} onChange - The callback function to handle value changes.
 * @returns {JSX.Element} The JSX representation of the RadioButton component.
 */
const RadioButton = ({ name, row, value, onChange }) => {
  return (
    <RadioGroup
      name={name}
      row={row ? true : false}
      value={value}
      onChange={(event) =>
        onChange(
          event.target.value === "true", // Convert string value to a boolean
        )
      }
    >
      <FormControlLabel
        value="true"
        control={<Radio />}
        label="Yes"
      />
      <FormControlLabel
        value="false"
        control={<Radio />}
        label="No"
      />
    </RadioGroup>
  );
};

export default RadioButton;
