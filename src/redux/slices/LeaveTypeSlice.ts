import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { CreateLeaveTypeDto, UpdateLeaveTypeDto } from '../../dtos/leaveTypeDtos';
import LeaveType from '../../models/features/LeaveType';
import agent from '../../api/Agent';


interface LeaveTypeState {
    leaveTypes: LeaveType[];
    selectedLeaveType: LeaveType | null;
    loading: boolean;
    error: string | null;
}

const initialState: LeaveTypeState = {
    leaveTypes: [],
    selectedLeaveType: null,
    loading: false,
    error: null,
};


export const fetchLeaveTypes = createAsyncThunk(
    'leaveTypes/fetchLeaveTypes',
    async (_, thunkAPI) => {
        try {
            const response = await agent.LeaveTypeService.getAll();
            return response;
        } catch (error:any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);


export const fetchLeaveTypeDetails = createAsyncThunk(
    'leaveTypes/fetchLeaveTypeDetails',
    async (id: number, thunkAPI) => {
        try {
            const response = await agent.LeaveTypeService.getDetails(id);
            return response;
        } catch (error:any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const createLeaveType = createAsyncThunk(
    'leaveTypes/createLeaveType',
    async (leaveType: CreateLeaveTypeDto, thunkAPI) => {
        try {
            const response = await agent.LeaveTypeService.create(leaveType);
            return response;
        } catch (error:any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Async thunk for updating a leave type
export const updateLeaveType = createAsyncThunk(
    'leaveTypes/updateLeaveType',
    async (leaveType: UpdateLeaveTypeDto, thunkAPI) => {
        try {
            const response = await agent.LeaveTypeService.update(leaveType);
            return response;
        } catch (error:any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Async thunk for deleting a leave type
export const deleteLeaveType = createAsyncThunk(
    'leaveTypes/deleteLeaveType',
    async (id: number, thunkAPI) => {
        try {
            await agent.LeaveTypeService.delete(id);
            return id;
        } catch (error:any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const leaveTypeSlice = createSlice({
    name: 'leaveTypes',
    initialState,
    reducers: {
        clearSelectedLeaveType: (state) => {
            state.selectedLeaveType = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch all leave types
            .addCase(fetchLeaveTypes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLeaveTypes.fulfilled, (state, action) => {
                state.leaveTypes = action.payload;
                state.loading = false;
            })
            .addCase(fetchLeaveTypes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Fetch leave type details
            .addCase(fetchLeaveTypeDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLeaveTypeDetails.fulfilled, (state, action) => {
                state.selectedLeaveType = action.payload;
                state.loading = false;
            })
            .addCase(fetchLeaveTypeDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Create a new leave type
            .addCase(createLeaveType.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createLeaveType.fulfilled, (state, action) => {
                state.leaveTypes.push(action.payload);
                state.loading = false;
            })
            .addCase(createLeaveType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Update a leave type
            .addCase(updateLeaveType.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateLeaveType.fulfilled, (state, action) => {
                const index = state.leaveTypes.findIndex(lt => lt.id === action.payload.id);
                if (index !== -1) {
                    state.leaveTypes[index] = action.payload;
                }
                state.loading = false;
            })
            .addCase(updateLeaveType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Delete a leave type
            .addCase(deleteLeaveType.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteLeaveType.fulfilled, (state, action) => {
                state.leaveTypes = state.leaveTypes.filter(lt => lt.id !== action.payload);
                state.loading = false;
            })
            .addCase(deleteLeaveType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearSelectedLeaveType } = leaveTypeSlice.actions;

export default leaveTypeSlice.reducer;