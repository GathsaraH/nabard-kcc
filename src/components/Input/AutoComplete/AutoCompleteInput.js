import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { ColorConstants } from 'src/constants/ColorConstants';

const AutoCompleteInput = ({
  id,
  size,
  className,    
  options,
  name,
  value,
  popupIcon,
  onChange,
  autoHighlight,
  label,
  required,
}) => {
  return (
    <Autocomplete
      id={id}
      size={size}
      sx={{ className }}
      className={className}
      options={options}
      name={name}
      value={value}
      popupIcon={<MdKeyboardArrowDown color={ColorConstants.lightDark} size={25} />}
      onChange={(e, option) => onChange(option)}
      autoHighlight={autoHighlight}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          required={required}
          className={className}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password',
            style: {
              fontSize: '0.875rem',
              fontFamily: 'Montserrat',
              fontWeight: '500',
            },
          }}
        />
      )}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          <span className={className}>{option.label}</span>
        </Box>
      )}
    />
  );
};

export default AutoCompleteInput;
