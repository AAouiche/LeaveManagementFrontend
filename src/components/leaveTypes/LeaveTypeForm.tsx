import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Box, Stack, Typography, Button, CircularProgress, TextField } from '@mui/material';
import ErrorAlert from '../common/Error/ErrorAlert';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Store';

interface LeaveTypeFormProps {
    initialValues: { name: string; days: number; id?: number }; 
    onSubmit: (values: { name: string; days: number; id?: number }) => void;
    title: string;
    submitText: string;
    isLoading: boolean;
    error?: string | null; 
}

const validationSchema = Yup.object({
    name: Yup.string().required('Leave Type Name is required'),
    days: Yup.number()
        .required('Default Days is required')
        .min(0, 'Days cannot be negative')
        .max(365, 'Days cannot exceed 365'),
});

const LeaveTypeForm: React.FC<LeaveTypeFormProps> = ({ initialValues, onSubmit, title, submitText, isLoading }) => {
    const {error } = useSelector((state: RootState) => state.leaveTypes);
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                onSubmit(values);
                setSubmitting(false);
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Box 
                        sx={{ 
                            padding: '32px', 
                            maxWidth: '500px', 
                            minWidth: '900px',
                            width: '100%',
                            margin: '0 auto', 
                            boxShadow: 3, 
                            borderRadius: '12px',
                            backgroundColor: 'white',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            minHeight: '500px',
                        }}
                    >
                        <Typography variant="h4" gutterBottom>
                            {title}
                        </Typography>

                        
                        

                        <Stack spacing={4} flexGrow={1} justifyContent="center">
                            <Field name="name">
                                {({ field, meta }: any) => (
                                    <TextField
                                        {...field}
                                        label="Leave Type Name"
                                        fullWidth
                                        error={meta.touched && Boolean(meta.error)}
                                        helperText={meta.touched && meta.error ? meta.error : ''}
                                        variant="outlined"
                                        margin="normal"
                                        sx={{ fontSize: '18px' }}
                                    />
                                )}
                            </Field>

                            <Field name="days">
                                {({ field, meta }: any) => (
                                    <TextField
                                        {...field}
                                        label="Default Days"
                                        type="number"
                                        fullWidth
                                        error={meta.touched && Boolean(meta.error)}
                                        helperText={meta.touched && meta.error ? meta.error : ''}
                                        variant="outlined"
                                        margin="normal"
                                        sx={{ fontSize: '18px' }}
                                    />
                                )}
                            </Field>
                        </Stack>
                        {error && <ErrorAlert error={error} />}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting || isLoading}
                            fullWidth
                            sx={{ padding: '16px 0', fontSize: '18px', mt: 4 }}
                        >
                            {isSubmitting || isLoading ? <CircularProgress size={24} /> : submitText}
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export default LeaveTypeForm;