import  { useEffect } from 'react';
import { Box, Button, Grid, Card, CardContent, Typography, Badge, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/Store';
import { Link, useNavigate } from 'react-router-dom';
import { fetchLeaveRequests } from '../../redux/slices/LeaveRequestSlice';
import "./LeaveRequestIndex.css"
const LeaveRequests = () => {
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
  
    const goToDetails = (id: number) => {
        navigate(`/leaverequests/${id}`);
    };

    return (
        <Box className="leave-requests-container" sx={{ padding: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Typography variant="h3" gutterBottom>
                    Leave Requests
                </Typography>
                <Button variant="contained" color="success" component={Link} to="/leaverequests/create">
                    Add Leave Request
                </Button>
            </Box>

            {loading ? (
                <Box display="flex" justifyContent="center" mt={3}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Box display="flex" justifyContent="center" mt={3}>
                    <Typography color="error">{error}</Typography>
                </Box>
            ) : (
                <>
                    <Grid container spacing={3} mb={4}>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card sx={{ backgroundColor: '#17a2b8', color: 'white', boxShadow: 3 }}>
                                <CardContent>
                                    <Typography variant="h5">Total Requests</Typography>
                                    <Typography variant="h6">{totalRequests}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
  
                        <Grid item xs={12} sm={6} md={3}>
                            <Card sx={{ backgroundColor: '#ffc107', color: 'white', boxShadow: 3 }}>
                                <CardContent>
                                    <Typography variant="h5">Pending Requests</Typography>
                                    <Typography variant="h6">{pendingRequests}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
  
                        <Grid item xs={12} sm={6} md={3}>
                            <Card sx={{ backgroundColor: '#28a745', color: 'white', boxShadow: 3 }}>
                                <CardContent>
                                    <Typography variant="h5">Approved Requests</Typography>
                                    <Typography variant="h6">{approvedRequests}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
  
                        <Grid item xs={12} sm={6} md={3}>
                            <Card sx={{ backgroundColor: '#dc3545', color: 'white', boxShadow: 3 }}>
                                <CardContent>
                                    <Typography variant="h5">Rejected Requests</Typography>
                                    <Typography variant="h6">{rejectedRequests}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    <Box>
                        <Typography variant="h4" gutterBottom>
                            Leave Request Log
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Employee Id</TableCell>
                                        <TableCell>Start Date</TableCell>
                                        <TableCell>End Date</TableCell>
                                        <TableCell>Leave Type</TableCell>
                                        <TableCell>Date Requested</TableCell>
                                        <TableCell>Approval Status</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {leaveRequests.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{item.requestingEmployeeId}</TableCell>
                                            <TableCell>{new Date(item.startDate).toLocaleDateString()}</TableCell>
                                            <TableCell>{new Date(item.endDate).toLocaleDateString()}</TableCell>
                                            <TableCell>{item.leaveType?.name || 'N/A'}</TableCell>
                                            <TableCell>{new Date(item.dateRequested).toLocaleDateString()}</TableCell>
                                            <TableCell>
                                                {item.cancelled ? (
                                                    <Badge badgeContent="Cancelled" color="secondary" />
                                                ) : item.approved === true ? (
                                                    <Badge badgeContent="Approved" color="success" />
                                                ) : item.approved === false ? (
                                                    <Badge badgeContent="Rejected" color="error" />
                                                ) : (
                                                    <Badge badgeContent="Pending" color="warning" />
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {!item.cancelled && (
                                                    <Button
                                                        variant="outlined"
                                                        color="primary"
                                                        onClick={() => goToDetails(item.id)}
                                                        startIcon={<i className="fa fa-file" />}
                                                    >
                                                        Review
                                                    </Button>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default LeaveRequests;