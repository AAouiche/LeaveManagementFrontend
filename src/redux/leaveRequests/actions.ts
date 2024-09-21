import { createAsyncThunk } from '@reduxjs/toolkit';
import LeaveRequest from '../../models/features/LeaveRequest';
import agent from '../../api/Agent';
import { CreateLeaveRequestDto, UpdateLeaveRequestDto } from '../../dtos/leaveRequestDtos';



// Async thunk for fetching all leave requests
export const fetchLeaveRequests = createAsyncThunk<
  LeaveRequest[],
  void,
  { rejectValue: string }
>('leaveRequests/fetchLeaveRequests', async (_, thunkAPI) => {
  try {
    const response = await agent.LeaveRequestService.getAll();
    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Async thunk for fetching leave request details
export const fetchLeaveRequestDetails = createAsyncThunk<
  LeaveRequest,
  number,
  { rejectValue: string }
>('leaveRequests/fetchLeaveRequestDetails', async (id, thunkAPI) => {
  try {
    const response = await agent.LeaveRequestService.getDetails(id);
    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Async thunk for creating a new leave request
export const createLeaveRequest = createAsyncThunk<
  LeaveRequest,
  FormData,
  { rejectValue: string }
>('leaveRequests/createLeaveRequest', async (formData, thunkAPI) => {
  try {
    const response = await agent.LeaveRequestService.create(formData);
    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Async thunk for updating a leave request
export const updateLeaveRequest = createAsyncThunk<
  LeaveRequest,
  UpdateLeaveRequestDto,
  { rejectValue: string }
>('leaveRequests/updateLeaveRequest', async (leaveRequest, thunkAPI) => {
  try {
    const response = await agent.LeaveRequestService.update(leaveRequest);
    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Async thunk for deleting a leave request
export const deleteLeaveRequest = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>('leaveRequests/deleteLeaveRequest', async (id, thunkAPI) => {
  try {
    await agent.LeaveRequestService.delete(id);
    return id;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});