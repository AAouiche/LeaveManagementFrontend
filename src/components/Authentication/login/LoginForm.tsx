import React from 'react';
import { TextField, Button, Typography, Box, Container, Paper } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/Store';
import { loginUser } from '../../../redux/slices/UserSlice';
import FormContainer from '../../common/form/FormContainer';

  
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });
  
  const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
  
    return (
      <FormContainer title="Login">
        <Formik
          initialValues={{ email: '', password: '', rememberMe: false }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, setFieldError }) => {
            try {
              const resultAction = await dispatch(loginUser(values));
              if (loginUser.fulfilled.match(resultAction)) {
                navigate('/leaverequests');
              } else {
                setFieldError('email', 'Invalid email or password');
              }
            } catch (err) {
              setFieldError('email', 'Invalid email or password');
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
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
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
                autoComplete="current-password"
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
                {isSubmitting ? 'Logging in...' : 'LOGIN'}
              </Button>
  
              <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                Don't have an account?{' '}
                <Link to="/public/register" style={{ textDecoration: 'none' }}>
                  Register here
                </Link>
              </Typography>
            </Form>
          )}
        </Formik>
      </FormContainer>
    );
  };
  
  export default LoginForm;