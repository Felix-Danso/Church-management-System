import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../Utility/axios"
import {alerts} from "../Utility/alerts";


const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    tokens: JSON.parse(localStorage.getItem('token')),
    status: 'idle',
    signOutStatus: 'idle',
};


export const login = createAsyncThunk(
    'user/login',
    async (credentials, { dispatch, rejectWithValue }) => {
        try{
            const response = await axios.post('auth/login/', credentials);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('token', JSON.stringify(response.data.data));
            dispatch(saveLogin(response.data))
            return response.data;
        } catch (error) {
            if(error?.response && error?.response?.data.detail) {
                return rejectWithValue(error.response.data.detail)
            }
            return rejectWithValue(error.message)
        }
});

export const signOut = createAsyncThunk('logout/user', async (_, { dispatch }) => {
    try {
        const refresh = JSON.parse(localStorage.getItem('token'))?.refresh
        await axios.post('auth/logout/', { refresh });
        dispatch(logout());
        window.location.reload();
        alerts('success', 'You have logged out successfully');
    } catch (error) {
        alerts('error', error?.response.data.detail || error?.message);
    }
});

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        saveLogin (state, action) {
            state.user = action.payload.user
            state.tokens = action.payload.token
        },
        logout: (state) => {
            state.user = null;
            state.tokens = null;
            localStorage.clear();
        },
    },
    extraReducers(builder) {
        builder
            .addCase(login.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
            })
            .addCase(signOut.pending, (state, action) => {
                    state.signOutStatus = 'loading';
            })
            .addCase(signOut.fulfilled, (state, action) => {
                state.signOutStatus = 'succeeded';
            })
            .addCase(signOut.rejected, (state, action) => {
                state.signOutStatus = 'failed';
            });
        },
});

export const {saveLogin, logout} = loginSlice.actions

export default loginSlice.reducer;
