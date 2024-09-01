import { createAsyncThunk } from "@reduxjs/toolkit";
import { UpdateLeaveAllocationDto } from "../../dtos/leaveAllocationDtos/UpdateLeaveAllocationDto";
import LeaveAllocationService from "../../api/LeaveAllocationService";
import { CreateLeaveAllocationDto } from "../../dtos/leaveAllocationDtos/CreateLeaveAllocationDto";

export const fetchLeaveAllocations = createAsyncThunk(
    'leaveAllocations/fetchAll',
    async (_, thunkAPI) => {
        try {
            const response = await LeaveAllocationService.getAll();
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const fetchLeaveAllocationDetails = createAsyncThunk(
    'leaveAllocations/fetchDetails',
    async (id: number, thunkAPI) => {
        try {
            const response = await LeaveAllocationService.getDetails(id);
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const createLeaveAllocation = createAsyncThunk(
    'leaveAllocations/create',
    async (leaveAllocation: CreateLeaveAllocationDto, thunkAPI) => {
        try {
            const response = await LeaveAllocationService.create(leaveAllocation);
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const updateLeaveAllocation = createAsyncThunk(
    'leaveAllocations/update',
    async (leaveAllocation: UpdateLeaveAllocationDto, thunkAPI) => {
        try {
            const response = await LeaveAllocationService.update(leaveAllocation);
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const deleteLeaveAllocation = createAsyncThunk(
    'leaveAllocations/delete',
    async (id: number, thunkAPI) => {
        try {
            await LeaveAllocationService.delete(id);
            return id;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);