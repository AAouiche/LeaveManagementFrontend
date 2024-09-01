import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../redux/Store';
import { fetchLeaveTypeDetails, updateLeaveType } from '../../redux/slices/LeaveTypeSlice';
import { UpdateLeaveTypeDto } from '../../dtos/leaveTypeDtos';
import LeaveTypeForm from './LeaveTypeForm';
import Loader from '../common/Loader';


const EditLeaveType = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const leaveType = useSelector((state: RootState) => state.leaveTypes.selectedLeaveType);
    const isLoading = useSelector((state: RootState) => state.leaveTypes.loading);

    useEffect(() => {
        if (id) {
            dispatch(fetchLeaveTypeDetails(Number(id)));
        }
    }, [dispatch, id]);

    const handleSubmit = (values: { name: string; days: number; id?: number }) => {
        if (id) {
            
            dispatch(updateLeaveType({ ...values, id: Number(id) }))
                .then(() => navigate('/admin/leave-types'))
                .catch((error) => console.error('Failed to update leave type', error));
        } else {
            console.error('ID is required to update leave type');
        }
    };

    return leaveType ? (
        <LeaveTypeForm
            initialValues={leaveType}
            onSubmit={handleSubmit}
            title="Edit Leave Type"
            submitText="Update"
            isLoading={isLoading}
        />
    ) : (
        <Loader/>
    );
};

export default EditLeaveType;