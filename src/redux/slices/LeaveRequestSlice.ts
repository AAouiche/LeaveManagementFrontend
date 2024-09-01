import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { CreateLeaveRequestDto, UpdateLeaveRequestDto } from '../../dtos/leaveRequestDtos';
import LeaveRequest from '../../models/features/LeaveRequest';
import agent from '../../api/Agent';


interface LeaveRequestState {
    leaveRequests: LeaveRequest[];
    selectedLeaveRequest: LeaveRequest | null;
    loading: boolean;
    error: string | null;
  }
  
  const initialState: LeaveRequestState = {
    leaveRequests: [],
    selectedLeaveRequest: null,
    loading: false,
    error: null,
  };
  
  // Async thunk for fetching all leave requests
  export const fetchLeaveRequests = createAsyncThunk(
    'leaveRequests/fetchLeaveRequests',
    async (_, thunkAPI) => {
      try {
        const response = await agent.LeaveRequestService.getAll();
        return response;
      } catch (error:any) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
  
  // Async thunk for fetching leave request details
  export const fetchLeaveRequestDetails = createAsyncThunk(
    'leaveRequests/fetchLeaveRequestDetails',
    async (id: number, thunkAPI) => {
      try {
        const response = await agent.LeaveRequestService.getDetails(id);
        return response;
      } catch (error:any) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
  
  // Async thunk for creating a new leave request
  export const createLeaveRequest = createAsyncThunk(
    'leaveRequests/createLeaveRequest',
    async (formData: FormData, thunkAPI) => {
        try {
            const response = await agent.LeaveRequestService.create(formData);  
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
  
  // Async thunk for updating a leave request
  export const updateLeaveRequest = createAsyncThunk(
    'leaveRequests/updateLeaveRequest',
    async (leaveRequest: UpdateLeaveRequestDto, thunkAPI) => {
      try {
        const response = await agent.LeaveRequestService.update(leaveRequest);
        return response;
      } catch (error:any) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
  
  // Async thunk for deleting a leave request
  export const deleteLeaveRequest = createAsyncThunk(
    'leaveRequests/deleteLeaveRequest',
    async (id: number, thunkAPI) => {
      try {
        await agent.LeaveRequestService.delete(id);
        return id;
      } catch (error:any) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
  
  const leaveRequestSlice = createSlice({
    name: 'leaveRequests',
    initialState,
    reducers: {
      clearSelectedLeaveRequest: (state) => {
        state.selectedLeaveRequest = null;
      }
    },
    extraReducers: (builder) => {
      builder
        // Fetch all leave requests
        .addCase(fetchLeaveRequests.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchLeaveRequests.fulfilled, (state, action) => {
          state.leaveRequests = action.payload;
          state.loading = false;
        })
        .addCase(fetchLeaveRequests.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
  
        // Fetch leave request details
        .addCase(fetchLeaveRequestDetails.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchLeaveRequestDetails.fulfilled, (state, action) => {
          state.selectedLeaveRequest = action.payload;
          state.loading = false;
        })
        .addCase(fetchLeaveRequestDetails.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
  
        // Create a new leave request
        .addCase(createLeaveRequest.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(createLeaveRequest.fulfilled, (state, action) => {
          state.leaveRequests.push(action.payload);
          state.loading = false;
        })
        .addCase(createLeaveRequest.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
  
        // Update a leave request
        .addCase(updateLeaveRequest.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateLeaveRequest.fulfilled, (state, action) => {
          const index = state.leaveRequests.findIndex(lr => lr.id === action.payload.id);
          if (index !== -1) {
            state.leaveRequests[index] = action.payload;
          }
          state.loading = false;
        })
        .addCase(updateLeaveRequest.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
  
        // Delete a leave request
        .addCase(deleteLeaveRequest.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(deleteLeaveRequest.fulfilled, (state, action) => {
          state.leaveRequests = state.leaveRequests.filter(lr => lr.id !== action.payload);
          state.loading = false;
        })
        .addCase(deleteLeaveRequest.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
    },
  });
  
  export const { clearSelectedLeaveRequest } = leaveRequestSlice.actions;
  
  export default leaveRequestSlice.reducer;