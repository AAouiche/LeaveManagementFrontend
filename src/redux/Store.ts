import { configureStore } from '@reduxjs/toolkit';
import leaveRequestReducer from './slices/LeaveRequestSlice';
import leaveAllocationsReducer from './slices/LeaveAllocationSlice';
import leaveTypeReducer from './slices/LeaveTypeSlice';
import userReducer from './slices/UserSlice';

const store = configureStore({
  reducer: {
    leaveRequests: leaveRequestReducer,
    leaveTypes: leaveTypeReducer,
    leaveAllocations: leaveAllocationsReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;