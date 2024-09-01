import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LeaveAllocation } from "../../models/features/LeaveAllocation";
import { createLeaveAllocation, deleteLeaveAllocation, fetchLeaveAllocationDetails, fetchLeaveAllocations, updateLeaveAllocation } from "../thunks/LeaveAllocationThunks";


export interface LeaveAllocationState {
    leaveAllocations: LeaveAllocation[];
    selectedLeaveAllocation: LeaveAllocation | null;
    loading: boolean;
    error: string | null;
}


// Utility functions for setting loading and error states
const setLoading = (state: LeaveAllocationState) => {
    state.loading = true;
    state.error = null;
};

const setError = (state: LeaveAllocationState, action: PayloadAction<string | undefined>) => {
    state.loading = false;
    state.error = action.payload || 'An error occurred.';
};

// Handle cases related to fetching leave allocations
const handleFetchCases = (builder: any) => {
    builder
        .addCase(fetchLeaveAllocations.pending, setLoading)
        .addCase(fetchLeaveAllocations.fulfilled, (state: LeaveAllocationState, action: PayloadAction<LeaveAllocation[]>) => {
            state.leaveAllocations = action.payload;
            state.loading = false;
        })
        .addCase(fetchLeaveAllocations.rejected, setError);
};

// Handle cases related to leave allocation details
const handleDetailsCases = (builder: any) => {
    builder
        .addCase(fetchLeaveAllocationDetails.pending, setLoading)
        .addCase(fetchLeaveAllocationDetails.fulfilled, (state: LeaveAllocationState, action: PayloadAction<LeaveAllocation>) => {
            state.selectedLeaveAllocation = action.payload;
            state.loading = false;
        })
        .addCase(fetchLeaveAllocationDetails.rejected, setError);
};

// Handle cases related to creating a leave allocation
const handleCreateCases = (builder: any) => {
    builder
        .addCase(createLeaveAllocation.pending, setLoading)
        .addCase(createLeaveAllocation.fulfilled, (state: LeaveAllocationState, action: PayloadAction<LeaveAllocation>) => {
            state.leaveAllocations.push(action.payload);
            state.loading = false;
        })
        .addCase(createLeaveAllocation.rejected, setError);
};

// Handle cases related to updating a leave allocation
const handleUpdateCases = (builder: any) => {
    builder
        .addCase(updateLeaveAllocation.pending, setLoading)
        .addCase(updateLeaveAllocation.fulfilled, (state: LeaveAllocationState, action: PayloadAction<LeaveAllocation>) => {
            const index = state.leaveAllocations.findIndex(allocation => allocation.id === action.payload.id);
            if (index !== -1) {
                state.leaveAllocations[index] = action.payload;
            }
            state.loading = false;
        })
        .addCase(updateLeaveAllocation.rejected, setError);
};

// Handle cases related to deleting a leave allocation
const handleDeleteCases = (builder: any) => {
    builder
        .addCase(deleteLeaveAllocation.pending, setLoading)
        .addCase(deleteLeaveAllocation.fulfilled, (state: LeaveAllocationState, action: PayloadAction<number>) => {
            state.leaveAllocations = state.leaveAllocations.filter(allocation => allocation.id !== action.payload);
            state.loading = false;
        })
        .addCase(deleteLeaveAllocation.rejected, setError);
};

const initialState: LeaveAllocationState = {
    leaveAllocations: [],
    selectedLeaveAllocation: null,
    loading: false,
    error: null,
};

const leaveAllocationsSlice = createSlice({
    name: 'leaveAllocations',
    initialState,
    reducers: {
        clearSelectedLeaveAllocation: (state) => {
            state.selectedLeaveAllocation = null;
        }
    },
    extraReducers: (builder) => {
        handleFetchCases(builder);
        handleDetailsCases(builder);
        handleCreateCases(builder);
        handleUpdateCases(builder);
        handleDeleteCases(builder);
    }
});

export const { clearSelectedLeaveAllocation } = leaveAllocationsSlice.actions;

export default leaveAllocationsSlice.reducer;