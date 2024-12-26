import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Button } from '@mui/material';
import dayjs from 'dayjs';
import LeaveRequest from '../../models/features/LeaveRequest';

const MySwal = withReactContent(Swal);

interface LeaveRequestDetailsModalProps {
  leaveRequest: LeaveRequest;
}

const LeaveRequestDetailsModal: React.FC<LeaveRequestDetailsModalProps> = ({ leaveRequest }) => {
  const showModal = () => {
    MySwal.fire({
      title: `<strong>Leave Request Details</strong>`,
      html: `
        <p><strong>Employee:</strong> ${leaveRequest.employee.firstName} ${leaveRequest.employee.lastName}</p>
        <p><strong>Start Date:</strong> ${dayjs(leaveRequest.startDate).format('MMM D, YYYY')}</p>
        <p><strong>End Date:</strong> ${dayjs(leaveRequest.endDate).format('MMM D, YYYY')}</p>
        <p><strong>Leave Type:</strong> ${leaveRequest.leaveType?.name || 'N/A'}</p>
        <p><strong>Comments:</strong> ${leaveRequest.requestComments || 'None'}</p>
      `,
      showCloseButton: true,
      showConfirmButton: false,
      focusConfirm: false,
    });
  };

  return (
    <Button variant="outlined" size="small" onClick={showModal}>
      View Details
    </Button>
  );
};

export default LeaveRequestDetailsModal;