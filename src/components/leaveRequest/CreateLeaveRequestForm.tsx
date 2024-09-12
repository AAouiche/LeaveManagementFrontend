import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    MenuItem,
    Grid,
    Paper,
    TextField
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { createLeaveRequest } from '../../redux/slices/LeaveRequestSlice';
import { AppDispatch, RootState } from '../../redux/Store';

import DragAndDrop from '../common/form/DragAndDrop';
import { fetchLeaveTypes } from '../../redux/slices/LeaveTypeSlice';


const LeaveRequestForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const employeeId = useSelector((state: RootState) => state.user.currentUser?.id);
    const { leaveTypes, loading: leaveTypesLoading } = useSelector((state: RootState) => state.leaveTypes);

    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        if (leaveTypes.length === 0) {
            dispatch(fetchLeaveTypes());
        }
    }, [dispatch, leaveTypes.length]);

    if (!employeeId) {
        console.error("Employee ID is not available");
        return null; 
    }

    const initialValues = {
        startDate: '',  
        endDate: '',  
        leaveTypeId: '',  
        requestComments: '',
    };

    const validationSchema = Yup.object({
        startDate: Yup.date().required('Start Date is required'),
        endDate: Yup.date().required('End Date is required'),
        leaveTypeId: Yup.number().required('Leave Type is required').min(1, 'Please select a leave type'),
        requestComments: Yup.string().required('Comments are required')
    });

    const handleFileDrop = (acceptedFiles: File[]) => {
        setFile(acceptedFiles[0]);
    };

    const onSubmit = (values: typeof initialValues) => {
        const formData = new FormData();
        formData.append('startDate', values.startDate);
        formData.append('endDate', values.endDate);
        formData.append('leaveTypeId', values.leaveTypeId.toString());
        formData.append('requestComments', values.requestComments);

        if (file) {
            formData.append('file', file);
        }

        dispatch(createLeaveRequest(formData)).then((resultAction) => {
            if (createLeaveRequest.fulfilled.match(resultAction)) {
                navigate('/leaverequests');
            } else {
                console.error('Failed to create leave request:', resultAction.payload);
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
                {({ values, handleChange, touched, errors }) => (
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
                                    helperText={touched.startDate && typeof errors.startDate === 'string' ? errors.startDate : undefined}
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
                                    helperText={touched.endDate && typeof errors.endDate === 'string' ? errors.endDate : undefined}
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
                                    helperText={touched.leaveTypeId ? errors.leaveTypeId : undefined}
                                    margin="normal"
                                    variant="outlined"
                                    disabled={leaveTypesLoading}  
                                >
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
                                    helperText={touched.requestComments ? errors.requestComments : undefined}
                                    margin="normal"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={4}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <DragAndDrop onDrop={handleFileDrop} />
                                {file && (
                                    <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                                        Selected file: {file.name}
                                    </Typography>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                <button
                                    type="submit"
                                    style={{
                                        padding: '10px 20px',
                                        backgroundColor: '#007bff',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        transition: 'background-color 0.3s ease',
                                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
                                >
                                    Submit Request
                                </button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </Paper>
    );
};

export default LeaveRequestForm;