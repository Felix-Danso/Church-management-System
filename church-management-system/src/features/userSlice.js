import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { alerts } from '../Utility/alerts';
import axios from '../Utility/axios';
import { getRandomColor } from '../Utility/getRamdomColor'

const initialState = {
    isAuthenticated: JSON.parse(localStorage.getItem('user')),
    // tokens: JSON.parse(localStorage.getItem('token'))?.refresh,
    status: 'idle',
    color: getRandomColor(),
};

export const signOut = createAsyncThunk('logout/user', async (_, { dispatch }) => {
    try {
        const refresh = initialState.tokens;
        await axios.post('', { refresh });
        dispatch(logout());
        window.location.reload();
        alerts('success', 'You have logged out successfully');
    } catch (error) {
        alerts('error', error?.response.data.detail || error?.message);
    }
});

export const authenticatedSlice = createSlice({
    name: 'authenticated',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.clear();
            state.isAuthenticated = null;
            state.tokens = null;
        },
        login: (state) => {
            state.isAuthenticated = JSON.parse(localStorage.getItem('user'));
            state.tokens = JSON.parse(localStorage.getItem('token'));
        },
        setIsAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(signOut.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(signOut.fulfilled, (state, action) => {
                state.status = 'succeeded';
            })
            .addCase(signOut.rejected, (state, action) => {
                state.status = 'failed';
            });
    },
});

export const { login, logout, setIsAuthenticated } = authenticatedSlice.actions;

export default authenticatedSlice.reducer;
