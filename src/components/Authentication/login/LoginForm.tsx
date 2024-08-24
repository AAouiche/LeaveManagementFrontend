import React from 'react';
import { Box, Typography, Alert, Checkbox, FormControlLabel, TextField, Button } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/Store';
import { loginUser } from '../../../redux/slices/UserSlice';
import './LoginFormStyle.css'; 


const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });
  
  const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
  
    return (
      <div className="login-container">
        <Box className="login-form">
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
          <Formik
            initialValues={{ email: '', password: '', rememberMe: false }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, setFieldError }) => {
              try {
                const resultAction = await dispatch(loginUser(values));
  
                
                if (loginUser.fulfilled.match(resultAction)) {
                  navigate('/');
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
            {({ errors, touched, isSubmitting, handleChange, values }) => (
              <Form>
                
                <Field
                  as={TextField}
                  label="Email"
                  name="email"
                  type="email"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <Field
                  as={TextField}
                  label="Password"
                  name="password"
                  type="password"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
                <Field
                  as={Checkbox}
                  name="rememberMe"
                  color="primary"
                  checked={values.rememberMe}
                  onChange={handleChange}
                  sx={{ display: 'none' }} 
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.rememberMe}
                      onChange={handleChange}
                      name="rememberMe"
                      color="primary"
                    />
                  }
                  label="Remember Me"
                />
                {errors.email && touched.email && (
                  <Alert severity="error">{errors.email}</Alert>
                )}
                <Box mt={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Logging in...' : 'Login'}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </div>
    );
  };
  
  export default LoginForm;