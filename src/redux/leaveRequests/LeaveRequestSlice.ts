import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { CreateLeaveRequestDto, UpdateLeaveRequestDto } from '../../dtos/leaveRequestDtos';
import LeaveRequest from '../../models/features/LeaveRequest';
import agent from '../../api/Agent';
import { cancelLeaveRequest, changeLeaveRequestApproval, createLeaveRequest, deleteLeaveRequest, fetchLeaveRequestDetails, fetchLeaveRequests, updateLeaveRequest } from './LeaveRequestThunks';


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
        .addCase(fetchLeaveRequests.fulfilled, (state, action: PayloadAction<LeaveRequest[]>) => {
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
        .addCase(fetchLeaveRequestDetails.fulfilled, (state, action: PayloadAction<LeaveRequest>) => {
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
        .addCase(createLeaveRequest.fulfilled, (state, action: PayloadAction<LeaveRequest>) => {
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
        .addCase(updateLeaveRequest.fulfilled, (state, action: PayloadAction<LeaveRequest>) => {
          const index = state.leaveRequests.findIndex((lr) => lr.id === action.payload.id);
          if (index !== -1) {
            state.leaveRequests[index] = action.payload;
          }
          if (state.selectedLeaveRequest?.id === action.payload.id) {
            state.selectedLeaveRequest = action.payload;
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
        .addCase(deleteLeaveRequest.fulfilled, (state, action: PayloadAction<number>) => {
          state.leaveRequests = state.leaveRequests.filter((lr) => lr.id !== action.payload);
          state.loading = false;
        })
        .addCase(deleteLeaveRequest.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
  
        // Cancel a leave request
        .addCase(cancelLeaveRequest.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(cancelLeaveRequest.fulfilled, (state, action: PayloadAction<LeaveRequest>) => {
          const index = state.leaveRequests.findIndex((lr) => lr.id === action.payload.id);
          if (index !== -1) {
            state.leaveRequests[index] = action.payload;
          }
          if (state.selectedLeaveRequest?.id === action.payload.id) {
            state.selectedLeaveRequest = action.payload;
          }
          state.loading = false;
        })
        .addCase(cancelLeaveRequest.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
  
        // Change leave request approval
        .addCase(changeLeaveRequestApproval.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(changeLeaveRequestApproval.fulfilled, (state, action: PayloadAction<LeaveRequest>) => {
          const index = state.leaveRequests.findIndex((lr) => lr.id === action.payload.id);
          if (index !== -1) {
            state.leaveRequests[index] = action.payload;
          }
          if (state.selectedLeaveRequest?.id === action.payload.id) {
            state.selectedLeaveRequest = action.payload;
          }
          state.loading = false;
        })
        .addCase(changeLeaveRequestApproval.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
    },
  });
  
  export const { clearSelectedLeaveRequest } = leaveRequestSlice.actions;
  export default leaveRequestSlice.reducer;