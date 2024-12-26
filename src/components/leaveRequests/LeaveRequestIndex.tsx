import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Card, CardContent, Typography, Badge, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/Store';
import { Link, useNavigate } from 'react-router-dom';
import { fetchLeaveRequests } from '../../redux/leaveRequests/LeaveRequestThunks';
import LeaveRequest from '../../models/features/LeaveRequest';
import dayjs from 'dayjs';
import LeaveRequestDetails from './LeaveRequestDetails';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';


const LeaveRequests: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { leaveRequests, loading, error } = useSelector(
    (state: RootState) => state.leaveRequests
  );

  useEffect(() => {
    dispatch(fetchLeaveRequests());
  }, [dispatch]);

  // Initialize SweetAlert2 with React content
  const MySwal = withReactContent(Swal);

  // Function to open SweetAlert2 modal with leave request details
  const openDetailsModal = (leaveRequest: LeaveRequest) => {
    MySwal.fire({
      title: <strong>Leave Request Details</strong>,
      html: (
        <div style={{ textAlign: 'left' }}>
          <p>
            <strong>Employee:</strong> {leaveRequest.employee.firstName}{' '}
            {leaveRequest.employee.lastName}
          </p>
          <p>
            <strong>Start Date:</strong>{' '}
            {dayjs(leaveRequest.startDate).format('MMM D, YYYY')}
          </p>
          <p>
            <strong>End Date:</strong>{' '}
            {dayjs(leaveRequest.endDate).format('MMM D, YYYY')}
          </p>
          <p>
            <strong>Leave Type:</strong> {leaveRequest.leaveType?.name || 'N/A'}
          </p>
          <p>
            <strong>Comments:</strong> {leaveRequest.requestComments || 'None'}
          </p>
        </div>
      ),
      showCloseButton: true,
      showConfirmButton: false, // Hide default 'OK' button
      width: '600px',
    });
  };

  const statusCounts = leaveRequests.reduce(
    (acc, lr) => {
      if (lr.cancelled) acc.cancelled += 1;
      else if (lr.approved === true) acc.approved += 1;
      else if (lr.approved === false) acc.rejected += 1;
      else acc.pending += 1;
      return acc;
    },
    { total: leaveRequests.length, pending: 0, approved: 0, rejected: 0, cancelled: 0 }
  );

  return (
    <Box sx={{ padding: 3 }}>
      {/* Header Section */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4">Leave Requests</Typography>
        <Button variant="contained" component={Link} to="/leaverequests/create">
          Add Leave Request
        </Button>
      </Box>

      {/* Status Cards */}
      <Grid container spacing={2} mb={4}>
        {['Total', 'Pending', 'Approved', 'Rejected'].map((status, index) => (
          <Grid item xs={6} sm={3} key={index}>
            <Card sx={{ boxShadow: 2 }}>
              <CardContent>
                <Typography variant="subtitle1">{status} Requests</Typography>
                <Typography variant="h5">
                  {statusCounts[status.toLowerCase() as keyof typeof statusCounts]}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Leave Request Table */}
      <Typography variant="h5" gutterBottom>
        Leave Request Log
      </Typography>
      <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee</TableCell>
              <TableCell>Start</TableCell>
              <TableCell>End</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ color: 'error.main' }}>
                  {error}
                </TableCell>
              </TableRow>
            ) : (
              leaveRequests.map((lr) => (
                <TableRow key={lr.id} hover>
                  <TableCell>
                    {lr.employee.firstName} {lr.employee.lastName}
                  </TableCell>
                  <TableCell>{dayjs(lr.startDate).format('MMM D, YYYY')}</TableCell>
                  <TableCell>{dayjs(lr.endDate).format('MMM D, YYYY')}</TableCell>
                  <TableCell>{lr.leaveType?.name || 'N/A'}</TableCell>
                  <TableCell>
                    <Badge
                      badgeContent={
                        lr.cancelled
                          ? 'Cancelled'
                          : lr.approved === true
                          ? 'Approved'
                          : lr.approved === false
                          ? 'Rejected'
                          : 'Pending'
                      }
                      color={
                        lr.cancelled
                          ? 'secondary'
                          : lr.approved === true
                          ? 'success'
                          : lr.approved === false
                          ? 'error'
                          : 'warning'
                      }
                    />
                  </TableCell>
                  <TableCell align="right">
                    {!lr.cancelled && (
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => openDetailsModal(lr)}
                      >
                        View Details
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default LeaveRequests;