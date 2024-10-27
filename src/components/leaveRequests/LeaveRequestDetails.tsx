import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  Grid,
  CircularProgress,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Card,
  CardContent,
  Stack,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../../redux/Store';

import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { fetchLeaveRequestDetails, updateLeaveRequest } from '../../redux/leaveRequests/LeaveRequestThunks';
import { clearSelectedLeaveRequest } from '../../redux/leaveRequests/LeaveRequestSlice';

// Styled Badge for better visibility
const StatusBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 8px',
    fontSize: '0.9rem',
    height: '24px',
    minWidth: '80px',
    borderRadius: '12px',
  },
}));

const LeaveRequestDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { selectedLeaveRequest, loading, error } = useSelector(
    (state: RootState) => state.leaveRequests
  );

  const [openRejectDialog, setOpenRejectDialog] = useState(false);
  const [rejectComments, setRejectComments] = useState('');

  useEffect(() => {
    if (id) {
      dispatch(fetchLeaveRequestDetails(Number(id)));
    }

    // Cleanup on unmount
    return () => {
      dispatch(clearSelectedLeaveRequest());
    };
  }, [dispatch, id]);

  const handleApprove = () => {
    if (!selectedLeaveRequest) return;

    const updateDto = {
      id: selectedLeaveRequest.id,
      approved: true,
    };

    dispatch(updateLeaveRequest(updateDto))
      .unwrap()
      .then(() => {
        toast.success('Leave request approved successfully.');
      })
      .catch((err: any) => {
        console.error('Failed to approve leave request:', err);
        toast.error(err || 'Failed to approve leave request.');
      });
  };

  const handleReject = () => {
    if (!selectedLeaveRequest) return;

    const updateDto = {
      id: selectedLeaveRequest.id,
      approved: false,
      requestComments: rejectComments,
    };

    dispatch(updateLeaveRequest(updateDto))
      .unwrap()
      .then(() => {
        toast.success('Leave request rejected successfully.');
        setOpenRejectDialog(false);
        setRejectComments('');
      })
      .catch((err: any) => {
        console.error('Failed to reject leave request:', err);
        toast.error(err || 'Failed to reject leave request.');
      });
  };

  const getStatusBadge = () => {
    let badgeContent = 'Pending';
    let color: 'warning' | 'success' | 'error' | 'secondary' = 'warning';

    if (selectedLeaveRequest?.cancelled) {
      badgeContent = 'Cancelled';
      color = 'secondary';
    } else if (selectedLeaveRequest?.approved === true) {
      badgeContent = 'Approved';
      color = 'success';
    } else if (selectedLeaveRequest?.approved === false) {
      badgeContent = 'Rejected';
      color = 'error';
    }

    return (
      <StatusBadge badgeContent={badgeContent} color={color} />
    );
  };

  if (loading || !selectedLeaveRequest) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={5}>
        <Typography variant="h6" color="error" gutterBottom>
          {error}
        </Typography>
        <Button variant="contained" onClick={() => navigate('/leaverequests')}>
          Go Back
        </Button>
      </Box>
    );
  }

  return (
    <Paper elevation={3} sx={{ padding: 4, marginTop: 4, maxWidth: 900, marginX: 'auto' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Leave Request Details
        </Typography>
        {getStatusBadge()}
      </Box>

      <Grid container spacing={4}>
        {/* Employee Information */}
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Employee Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1">
                    <strong>Name:</strong> {selectedLeaveRequest.employee.firstName} {selectedLeaveRequest.employee.lastName}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1">
                    <strong>Employee ID:</strong> {selectedLeaveRequest.employee.id}
                  </Typography>
                </Grid>
                {/* Add more employee-related fields here if needed */}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Leave Details */}
        <Grid item xs={12} sm={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Leave Details
              </Typography>
              <Typography variant="subtitle1">
                <strong>Start Date:</strong> {dayjs(selectedLeaveRequest.startDate).format('MMMM D, YYYY')}
              </Typography>
              <Typography variant="subtitle1">
                <strong>End Date:</strong> {dayjs(selectedLeaveRequest.endDate).format('MMMM D, YYYY')}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Total Days:</strong> {dayjs(selectedLeaveRequest.endDate).diff(dayjs(selectedLeaveRequest.startDate), 'day') + 1}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Leave Type:</strong> {selectedLeaveRequest.leaveType?.name || 'N/A'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Request Information */}
        <Grid item xs={12} sm={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Request Information
              </Typography>
              <Typography variant="subtitle1">
                <strong>Date Requested:</strong> {dayjs(selectedLeaveRequest.dateRequested).format('MMMM D, YYYY')}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Comments:</strong> {selectedLeaveRequest.requestComments || 'N/A'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Approval Information */}
        {selectedLeaveRequest.approved !== undefined && (
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Approval Information
                </Typography>
                <Typography variant="subtitle1">
                  <strong>Status:</strong> {selectedLeaveRequest.approved ? 'Approved' : 'Rejected'}
                </Typography>
                {/* Uncomment and modify the following lines if you have additional fields */}
                {/* 
                <Typography variant="subtitle1">
                  <strong>Reviewed By:</strong> {selectedLeaveRequest.reviewedBy?.name || 'N/A'}
                </Typography>
                <Typography variant="subtitle1">
                  <strong>Review Comments:</strong> {selectedLeaveRequest.reviewComments || 'N/A'}
                </Typography>
                */}
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Cancellation Information */}
        {selectedLeaveRequest.cancelled && (
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Cancellation Information
                </Typography>
                <Typography variant="subtitle1">
                  <strong>Status:</strong> Cancelled
                </Typography>
                {/* Add more cancellation-related fields here if needed */}
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>

      {/* Action Buttons */}
      {selectedLeaveRequest.approved === undefined && !selectedLeaveRequest.cancelled && (
        <Box mt={4} display="flex" justifyContent="flex-end">
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="success"
              onClick={handleApprove}
              size="large"
            >
              Approve
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => setOpenRejectDialog(true)}
              size="large"
            >
              Reject
            </Button>
          </Stack>
        </Box>
      )}

      {/* Reject Dialog */}
      <Dialog
        open={openRejectDialog}
        onClose={() => setOpenRejectDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Reject Leave Request</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Review Comments"
            type="text"
            fullWidth
            multiline
            minRows={4}
            value={rejectComments}
            onChange={(e) => setRejectComments(e.target.value)}
            placeholder="Provide a reason for rejection..."
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRejectDialog(false)}>Cancel</Button>
          <Button
            onClick={handleReject}
            disabled={rejectComments.trim() === ''}
            variant="contained"
            color="error"
          >
            Reject
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default LeaveRequestDetails;