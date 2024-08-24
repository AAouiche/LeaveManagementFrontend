import React from 'react';
import { Button } from '@mui/material';

interface SubmitButtonProps {
  text: string;
}

const SubmitButton = ({ text }: SubmitButtonProps) => {
  return (
    <Button
      fullWidth
      type="submit"
      variant="contained"
      color="primary"
    >
      {text}
    </Button>
  );
};

export default SubmitButton;