import React from 'react';
import {useDropzone} from 'react-dropzone'
import { Box, Typography } from '@mui/material';

interface DragAndDropProps {
    onDrop: (acceptedFiles: File[]) => void;
}

const DragAndDrop = (props: DragAndDropProps) => {
    const { onDrop } = props;
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
    });

    return (
        <Box
            {...getRootProps()}
            sx={{
                border: '2px dashed #ccc',
                borderRadius: '8px',
                padding: '16px',
                textAlign: 'center',
                cursor: 'pointer',
                backgroundColor: isDragActive ? '#e0e0e0' : '#f9f9f9',
            }}
        >
            <input {...getInputProps()} />
            <Typography variant="body1">
                {isDragActive ? 'Drop the file here ...' : 'Drag & drop a file here, or click to select a file'}
            </Typography>
        </Box>
    );
};

export default DragAndDrop;