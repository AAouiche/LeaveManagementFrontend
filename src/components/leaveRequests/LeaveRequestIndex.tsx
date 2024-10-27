import React, { useEffect } from 'react';
import { Box, Button, Grid, Card, CardContent, Typography, Badge, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/Store';
import { Link, useNavigate } from 'react-router-dom';
import { fetchLeaveRequests } from '../../redux/leaveRequests/LeaveRequestThunks';


const LeaveRequests: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
  
    const { leaveRequests, loading, error } = useSelector((state: RootState) => state.leaveRequests);
    
    const totalRequests = leaveRequests.length;
    const pendingRequests = leaveRequests.filter((lr) => lr.approved === null && !lr.cancelled).length;
    const approvedRequests = leaveRequests.filter((lr) => lr.approved === true).length;
    const rejectedRequests = leaveRequests.filter((lr) => lr.approved === false).length;

    useEffect(() => {
        dispatch(fetchLeaveRequests());
    }, [dispatch]);
    useEffect(() => {
        console.log("Leave Requests Data:", leaveRequests);
    }, [leaveRequests]);
  
    const goToDetails = (id: number) => {
        navigate(`/leaverequests/details/${id}`);
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Typography variant="h4" gutterBottom>
                    Leave Requests
                </Typography>
                <Button variant="contained" color="success" component={Link} to="/leaverequests/create">
                    Add Leave Request
                </Button>
            </Box>

            <Grid container spacing={3} mb={4}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ backgroundColor: '#17a2b8', color: 'white', boxShadow: 3 }}>
                        <CardContent>
                            <Typography variant="h6">Total Requests</Typography>
                            <Typography variant="h4">{totalRequests}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ backgroundColor: '#ffc107', color: 'white', boxShadow: 3 }}>
                        <CardContent>
                            <Typography variant="h6">Pending Requests</Typography>
                            <Typography variant="h4">{pendingRequests}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ backgroundColor: '#28a745', color: 'white', boxShadow: 3 }}>
                        <CardContent>
                            <Typography variant="h6">Approved Requests</Typography>
                            <Typography variant="h4">{approvedRequests}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ backgroundColor: '#dc3545', color: 'white', boxShadow: 3 }}>
                        <CardContent>
                            <Typography variant="h6">Rejected Requests</Typography>
                            <Typography variant="h4">{rejectedRequests}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Typography variant="h5" gutterBottom>
                Leave Request Log
            </Typography>
            <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Employee Name</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>End Date</TableCell>
                            <TableCell>Leave Type</TableCell>
                            <TableCell>Date Requested</TableCell>
                            <TableCell>Approval Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={7} align="center">Loading data...</TableCell>
                            </TableRow>
                        ) : error ? (
                            <TableRow>
                                <TableCell colSpan={7} align="center" sx={{ color: 'error.main' }}>{error}</TableCell>
                            </TableRow>
                        ) : (
                            leaveRequests.map((item) => (
                                <TableRow key={item.id} hover>
                                    <TableCell>{item.employee.firstName + " " + item.employee.lastName}</TableCell>
                                    <TableCell>{new Date(item.startDate).toLocaleDateString()}</TableCell>
                                    <TableCell>{new Date(item.endDate).toLocaleDateString()}</TableCell>
                                    <TableCell>{item.leaveType?.name || 'N/A'}</TableCell>
                                    <TableCell>{new Date(item.dateRequested).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <Badge 
                                            badgeContent={
                                                item.cancelled ? "Cancelled" :
                                                item.approved === true ? "Approved" :
                                                item.approved === false ? "Rejected" : "Pending"
                                            } 
                                            color={
                                                item.cancelled ? "secondary" :
                                                item.approved === true ? "success" :
                                                item.approved === false ? "error" : "warning"
                                            }
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {!item.cancelled && (
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                onClick={() => goToDetails(item.id)}
                                                sx={{ textTransform: 'none' }}
                                            >
                                                Review
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