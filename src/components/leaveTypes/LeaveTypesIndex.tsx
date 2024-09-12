
import React, { useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Stack,
    Box,
    Typography,
    CircularProgress,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../redux/Store';
import { clearSelectedLeaveType, deleteLeaveType, fetchLeaveTypes } from '../../redux/slices/LeaveTypeSlice';
import { createLeaveAllocation } from '../../redux/thunks/LeaveAllocationThunks';
import { CreateLeaveAllocationDto } from '../../dtos/leaveAllocationDtos/CreateLeaveAllocationDto';
import { toast } from 'react-toastify';

function LeaveTypesIndex() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { leaveTypes, loading, error } = useSelector((state: RootState) => state.leaveTypes);
    
    useEffect(() => {
        dispatch(fetchLeaveTypes());
    }, [dispatch]);

    const handleEdit = (id: number) => {
        dispatch(clearSelectedLeaveType());
        navigate(`/admin/leavetypes/edit/${id}`);
    };

    const handleDelete = (id: number) => {
        dispatch(deleteLeaveType(id));
    };

    function handleAllocate(LeaveTypeId: number) {
        const allocationData: CreateLeaveAllocationDto = {
            LeaveTypeId,
        };
        dispatch(createLeaveAllocation(allocationData))
            .then(() => {
                toast.success("Leave allocation successful!");
            })
            .catch(() => {
                toast.error("Failed to allocate leave.");
            });
    }

    const handleDetails = (id: number) => {
        navigate(`/admin/leavetypes/details/${id}`);
    };

    const handleCreate = () => {
        navigate(`/admin/leavetypes/create`);
    };

    
    if (error) return <p>Error: {error}</p>;

    return (
        <Box sx={{ padding: 6, maxWidth: '100%', margin: '0 auto' }}>
            <Typography variant="h4" gutterBottom>
                Leave Types
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 3 }}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleCreate}
                    sx={{ padding: '12px 24px', fontSize: '16px' }}
                >
                    Add Leave Type
                </Button>
            </Box>
            <TableContainer component={Paper} sx={{ width: '100%', margin: '0 auto', boxShadow: 3 }}>
                <Table sx={{ minWidth: 800 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontSize: '18px', padding: '16px' }}>Id</TableCell>
                            <TableCell sx={{ fontSize: '18px', padding: '16px' }}>Name</TableCell>
                            <TableCell sx={{ fontSize: '18px', padding: '16px' }}>Default Days</TableCell>
                            <TableCell sx={{ fontSize: '18px', padding: '16px' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {leaveTypes.map((leaveType) => (
                            <TableRow key={leaveType.id}>
                                <TableCell sx={{ padding: '16px' }}>{leaveType.id}</TableCell>
                                <TableCell sx={{ padding: '16px' }}>{leaveType.name}</TableCell>
                                <TableCell sx={{ padding: '16px' }}>{leaveType.days}</TableCell>
                                <TableCell sx={{ padding: '16px' }}>
                                    <Stack direction="row" spacing={2}>
                                        <Button
                                            variant="contained"
                                            color="success"
                                            onClick={() => handleAllocate(leaveType.id)}
                                            startIcon={<AssignmentTurnedInIcon />}
                                            sx={{ minWidth: '160px' }} 
                                        >
                                            Allocate Leave
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="warning"
                                            onClick={() => handleEdit(leaveType.id)}
                                            startIcon={<EditIcon />}
                                            sx={{ minWidth: '120px' }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={() => handleDelete(leaveType.id)}
                                            startIcon={<DeleteIcon />}
                                            sx={{ minWidth: '130px' }}
                                        >
                                            Delete
                                        </Button>
                                        
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default LeaveTypesIndex;