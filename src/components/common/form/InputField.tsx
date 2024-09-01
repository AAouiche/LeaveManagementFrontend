import React from 'react';
import { MenuItem, TextField } from '@mui/material';

interface InputFieldProps {
  label: string;
  type?: string;
  name: string;
  value: any; 
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  error?: boolean;
  helperText?: string;
  selectOptions?: { value: any; label: string }[];  
  multiline?: boolean; 
  rows?: number; 
}

const InputField = ({
  label,
  type = 'text',
  name,
  value,
  handleChange,
  error,
  helperText,
  selectOptions,
  multiline = false,
  rows = 1,
}: InputFieldProps) => {
  return (
    <TextField
      fullWidth
      label={label}
      type={type}
      name={name}
      value={value}
      onChange={handleChange}
      error={error}
      helperText={helperText}
      margin="normal"
      variant="outlined"
      select={Boolean(selectOptions)}  
      multiline={multiline}
      rows={multiline ? rows : undefined}
    >
      {selectOptions &&
        selectOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
    </TextField>
  );
};

export default InputField;