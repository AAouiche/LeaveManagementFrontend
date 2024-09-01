import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../redux/Store';
import { createLeaveType } from '../../redux/slices/LeaveTypeSlice';
import LeaveTypeForm from './LeaveTypeForm';
import { CreateLeaveTypeDto } from '../../dtos/leaveTypeDtos/CreateLeaveTypeDto';

const CreateLeaveType = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const isLoading = useSelector((state: RootState) => state.leaveTypes.loading);

    const initialValues: CreateLeaveTypeDto = { name: '', days: 0 };

    const handleSubmit = (values: CreateLeaveTypeDto) => {
         dispatch(createLeaveType(values));
         //navigate("/admin/leavetypes")
    };

    return (
        <LeaveTypeForm
            initialValues={initialValues}
            onSubmit={handleSubmit}
            title="Create Leave Type"
            submitText="Create"
            isLoading={isLoading}
        />
    );
};

export default CreateLeaveType;