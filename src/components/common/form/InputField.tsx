import React from 'react';
import { TextField } from '@mui/material';

interface InputFieldProps {
    label: string;
    type: string;
    name: string;
    value: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: boolean;
    helperText?: string;
  }
  
  const InputField = ({ label, type, name, value, handleChange, error, helperText }: InputFieldProps) => {
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
      />
    );
  };
  
  export default InputField;