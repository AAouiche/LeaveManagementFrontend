import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import Login from "../../models/accounts/Login";
import User from "../../models/accounts/User";
import agent from "../../api/Agent";
import axios from "axios";
import { RootState } from "../Store";

interface UserState {
    currentUser: User | null;
    users: User[];
    loading: boolean;
    isLoggedIn: boolean;
    
    error: string | null;
}

const token = localStorage.getItem("jwtToken");

const initialState: UserState = {
    currentUser: token 
        ? {
            id: '', 
            firstName: '',
            lastName: '',
            email: '',
            token: token,
            role: ''
        } 
        : null,
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
    async (_, { getState, rejectWithValue }) => {
        const state = getState() as RootState;

        
        const token = state.user.currentUser?.token;
        if (!token) {
            console.log("No token found");
            return rejectWithValue("No token found");
        }

        try {
            
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            
            const response = await agent.UserService.getCurrentUser();
            console.log(response);

            return response;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);
export const initializeApp = createAsyncThunk(
    'user/initializeApp',
    async (_, { dispatch, rejectWithValue }) => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            try {
                
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                
                const response = await agent.UserService.getCurrentUser();
                return response;
            } catch (error: any) {
                
                localStorage.removeItem('jwtToken');
                delete axios.defaults.headers.common['Authorization'];
                dispatch(logout());
                return rejectWithValue("Invalid token");
            }
        } else {
            return rejectWithValue("No token found");
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
            localStorage.removeItem('jwtToken');
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
            if (action.payload?.token) {
                localStorage.setItem('jwtToken', action.payload.token);
            }
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
            state.isLoggedIn = true;
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

         // Handle app initialization
         builder.addCase(initializeApp.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(initializeApp.fulfilled, (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            state.isLoggedIn = true;
        });
        builder.addCase(initializeApp.rejected, (state, action) => {
            state.loading = false;
            state.isLoggedIn = false;
            state.currentUser = null;
            state.error = action.payload as string;
        });
    },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;