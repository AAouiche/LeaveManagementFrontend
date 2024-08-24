import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import Login from "../../models/accounts/Login";
import User from "../../models/accounts/User";
import agent from "../../api/Agent";

interface UserState {
    currentUser: User | null;
    users: User[];
    loading: boolean;
    isLoggedIn: boolean;
    error: string | null;
}

const initialState: UserState = {
    currentUser: null,
    users: [],
    loading: false,
    isLoggedIn: false,
    error: null,
};


export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (loginData: Login,{rejectWithValue}) => {
        try {
            const response = await agent.UserService.login(loginData);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);


export const fetchCurrentUser = createAsyncThunk(
    'user/fetchCurrentUser',
    async (_, thunkAPI) => {
        try {
            const response = await agent.UserService.getCurrentUser();
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);


export const fetchAllUsers = createAsyncThunk(
    'user/fetchAllUsers',
    async (_, thunkAPI) => {
        try {
            const response = await agent.UserService.getAllUsers();
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.currentUser = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        // Handle login
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            state.isLoggedIn = true;
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Handle fetching current user
        builder.addCase(fetchCurrentUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
        });
        builder.addCase(fetchCurrentUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Handle fetching all users
        builder.addCase(fetchAllUsers.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
        });
        builder.addCase(fetchAllUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;