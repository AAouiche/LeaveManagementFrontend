import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    MenuItem,
    Grid,
    Paper,
    TextField,
    Button
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { AppDispatch, RootState } from '../../redux/Store';

import DragAndDrop from '../common/form/DragAndDrop';
import { fetchLeaveTypes } from '../../redux/slices/LeaveTypeSlice';
import { toast } from 'react-toastify';
import { createLeaveRequest } from '../../redux/leaveRequests/LeaveRequestThunks';


const LeaveRequestForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const employeeId = useSelector((state: RootState) => state.user.currentUser?.id);
    const { leaveTypes, loading: leaveTypesLoading } = useSelector(
      (state: RootState) => state.leaveTypes
    );
  
    useEffect(() => {
      if (leaveTypes.length === 0) {
        dispatch(fetchLeaveTypes());
      }
    }, [dispatch, leaveTypes.length]);
    
    if (!employeeId) {
      console.error('Employee ID is not available');
      return null;
    }
  
    const initialValues = {
      startDate: '',
      endDate: '',
      leaveTypeId: '',
      requestComments: '',
      file: null as File | null,
    };
  
    const validationSchema = Yup.object({
      startDate: Yup.date()
    .required('Start Date is required')
    .min(
      new Date(new Date().setDate(new Date().getDate() + 1)),
      'Start Date must be in the future'
    ),
      endDate: Yup.date()
        .required('End Date is required')
        .min(Yup.ref('startDate'), 'End Date cannot be before Start Date'),
      leaveTypeId: Yup.number()
        .required('Leave Type is required')
        .min(1, 'Please select a leave type'),
      requestComments: Yup.string().required('Comments are required'),
      file: Yup.mixed<File>()
    .required('File is required')
    .test(
      'fileSize',
      'File size is too large (max 5MB)',
      (value) => !value || (value.size <= 5 * 1024 * 1024)
    )
    .test(
      'fileType',
      'Unsupported file format',
      (value) =>
        !value ||
        ['application/pdf', 'image/jpeg', 'image/png','text/plain'].includes(value.type)
    ),
    });
  
    const onSubmit = (values: typeof initialValues) => {
      const formData = new FormData();
      formData.append('employeeId', employeeId.toString());
      Object.entries(values).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          if (key === 'file') {
            formData.append('file', value);
          } else {
            formData.append(key, value as string);
          }
        }
      });
  
      dispatch(createLeaveRequest(formData))
    .unwrap()
    .then(() => {
      toast.success('Leave request created successfully.');
      navigate('/leaverequests');
    })
    .catch((error) => {
      console.error('Failed to create leave request:', error);

      
      if (error.response && error.response.data) {
        const serverError = error.response.data;
        toast.error(serverError.description || 'Failed to create leave request. Please try again.');
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error('Failed to create leave request. Please try again.');
      }
    });
    };
  
    return (
      <Paper sx={{ padding: 3, marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create Leave Request
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values, handleChange, touched, errors, setFieldValue }) => (
            <Form>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Start Date"
                    type="date"
                    name="startDate"
                    value={values.startDate}
                    onChange={handleChange}
                    error={touched.startDate && Boolean(errors.startDate)}
                    helperText={touched.startDate && errors.startDate}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="End Date"
                    type="date"
                    name="endDate"
                    value={values.endDate}
                    onChange={handleChange}
                    error={touched.endDate && Boolean(errors.endDate)}
                    helperText={touched.endDate && errors.endDate}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    select
                    fullWidth
                    label="Leave Type"
                    name="leaveTypeId"
                    value={values.leaveTypeId}
                    onChange={handleChange}
                    error={touched.leaveTypeId && Boolean(errors.leaveTypeId)}
                    helperText={touched.leaveTypeId && errors.leaveTypeId}
                    margin="normal"
                    variant="outlined"
                    disabled={leaveTypesLoading}
                  >
                    <MenuItem value="">
                      <em>Select Leave Type</em>
                    </MenuItem>
                    {leaveTypes.map((leaveType) => (
                      <MenuItem key={leaveType.id} value={leaveType.id}>
                        {leaveType.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Comments"
                    type="text"
                    name="requestComments"
                    value={values.requestComments}
                    onChange={handleChange}
                    error={touched.requestComments && Boolean(errors.requestComments)}
                    helperText={touched.requestComments && errors.requestComments}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item xs={12}>
                  <DragAndDrop name="file" />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ mt: 2 }}
                  >
                    Submit Request
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
    );
  };
  
  export default LeaveRequestForm;