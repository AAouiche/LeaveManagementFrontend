import React from 'react';
import { TextField, Button, Typography, Box, Container, Paper } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/Store';
import { registerUser } from '../../../redux/slices/UserSlice';

const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

const RegisterForm: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                bgcolor: 'background.default',
            }}
        >
            <Container maxWidth="sm">
                <Paper elevation={6} sx={{ p: 4, width: '100%' }}>
                    <Typography component="h1" variant="h4" align="center" gutterBottom>
                        Register
                    </Typography>
                    <Formik
                        initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
                        validationSchema={validationSchema}
                        onSubmit={async (values, { setSubmitting, setFieldError }) => {
                            try {
                                const resultAction = await dispatch(registerUser(values));
                                if (registerUser.fulfilled.match(resultAction)) {
                                    navigate('/');
                                } else {
                                    setFieldError('email', 'Registration failed');
                                }
                            } catch (err) {
                                setFieldError('email', 'Registration failed');
                            } finally {
                                setSubmitting(false);
                            }
                        }}
                    >
                        {({ errors, touched, isSubmitting, handleChange }) => (
                            <Form>
                                <Field
                                    as={TextField}
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    name="firstName"
                                    autoComplete="given-name"
                                    autoFocus
                                    onChange={handleChange}
                                    error={touched.firstName && Boolean(errors.firstName)}
                                    helperText={touched.firstName && errors.firstName}
                                    sx={{ mb: 2 }}
                                />
                                <Field
                                    as={TextField}
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    onChange={handleChange}
                                    error={touched.lastName && Boolean(errors.lastName)}
                                    helperText={touched.lastName && errors.lastName}
                                    sx={{ mb: 2 }}
                                />
                                <Field
                                    as={TextField}
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                    onChange={handleChange}
                                    error={touched.email && Boolean(errors.email)}
                                    helperText={touched.email && errors.email}
                                    sx={{ mb: 2 }}
                                />
                                <Field
                                    as={TextField}
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={handleChange}
                                    error={touched.password && Boolean(errors.password)}
                                    helperText={touched.password && errors.password}
                                    sx={{ mb: 2 }}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    sx={{ mt: 2, py: 1.5 }}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Registering...' : 'REGISTER'}
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Paper>
            </Container>
        </Box>
    );
};

export default RegisterForm;


