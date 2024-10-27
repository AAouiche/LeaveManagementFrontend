import { createAsyncThunk } from '@reduxjs/toolkit';
import LeaveRequest from '../../models/features/LeaveRequest';
import agent from '../../api/Agent';
import { CancelLeaveRequestDto, ChangeLeaveRequestApprovalDto, CreateLeaveRequestDto, UpdateLeaveRequestDto } from '../../dtos/leaveRequestDtos';



// Fetch all leave requests
export const fetchLeaveRequests = createAsyncThunk(
  'leaveRequests/fetchLeaveRequests',
  async (_, thunkAPI) => {
    try {
      const response = await agent.LeaveRequestService.getAll();
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Fetch leave request details
export const fetchLeaveRequestDetails = createAsyncThunk(
  'leaveRequests/fetchLeaveRequestDetails',
  async (id: number, thunkAPI) => {
    try {
      const response = await agent.LeaveRequestService.getDetails(id);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Create a new leave request
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

// Update a leave request
export const updateLeaveRequest = createAsyncThunk(
  'leaveRequests/updateLeaveRequest',
  async (leaveRequest: UpdateLeaveRequestDto, thunkAPI) => {
    try {
      const response = await agent.LeaveRequestService.update(leaveRequest);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Delete a leave request
export const deleteLeaveRequest = createAsyncThunk(
  'leaveRequests/deleteLeaveRequest',
  async (id: number, thunkAPI) => {
    try {
      await agent.LeaveRequestService.delete(id);
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Cancel a leave request
export const cancelLeaveRequest = createAsyncThunk(
  'leaveRequests/cancelLeaveRequest',
  async (data: CancelLeaveRequestDto, thunkAPI) => {
    try {
      const response = await agent.LeaveRequestService.cancel(data);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Change leave request approval
export const changeLeaveRequestApproval = createAsyncThunk(
  'leaveRequests/changeLeaveRequestApproval',
  async (data: ChangeLeaveRequestApprovalDto, thunkAPI) => {
    try {
      const response = await agent.LeaveRequestService.changeApproval(data);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);