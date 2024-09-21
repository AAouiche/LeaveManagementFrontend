import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useFormikContext } from 'formik';

interface DragAndDropProps {
    name: string;
  }
  
  const DragAndDrop: React.FC<DragAndDropProps> = ({ name }) => {
    const { setFieldValue, values, touched, errors } = useFormikContext<any>();
  
    const onDrop = React.useCallback(
      (acceptedFiles: File[]) => {
        setFieldValue(name, acceptedFiles[0]);
      },
      [setFieldValue, name]
    );
  
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: {
        'application/pdf': ['.pdf'],
        'image/jpeg': ['.jpeg', '.jpg'],
        'image/png': ['.png'],
        'text/plain':['.txt'],
      },
      multiple: false,
    });
  
    return (
      <Box
        {...getRootProps()}
        sx={{
          border: '2px dashed #ccc',
          padding: 2,
          textAlign: 'center',
          cursor: 'pointer',
          backgroundColor: isDragActive ? '#f0f0f0' : 'transparent',
        }}
      >
        <input {...getInputProps()} />
        <CloudUploadIcon sx={{ fontSize: 48, color: '#888' }} />
        <Typography variant="body1" color="textSecondary">
          {isDragActive
            ? 'Drop the file here...'
            : 'Drag & drop a file here, or click to select one'}
        </Typography>
        {values[name] && values[name].name && (
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            Selected file: {values[name].name}
          </Typography>
        )}
        {touched[name] && errors[name] && typeof errors[name] === 'string' && (
          <Typography variant="body2" color="error" sx={{ mt: 1 }}>
            {errors[name]}
          </Typography>
        )}
      </Box>
    );
  };
  
  export default DragAndDrop;