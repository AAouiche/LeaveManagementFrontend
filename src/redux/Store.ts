import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import leaveRequestReducer from './leaveRequests/LeaveRequestSlice';
import leaveAllocationsReducer from './slices/LeaveAllocationSlice';
import leaveTypeReducer from './slices/LeaveTypeSlice';
import userReducer from './slices/UserSlice';

const rootReducer = combineReducers({
  leaveRequests: leaveRequestReducer,
  leaveTypes: leaveTypeReducer,
  leaveAllocations: leaveAllocationsReducer,
  user: userReducer
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;