import {createSlice } from '@reduxjs/toolkit';
import { getRandomColor } from '../Utility/getRamdomColor'

const initialState = {
    isAuthenticated: JSON.parse(localStorage.getItem('user')),
    status: 'idle',
    color: getRandomColor(),
};


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
    },
});

export const { login, logout, setIsAuthenticated } = authenticatedSlice.actions;

export default authenticatedSlice.reducer;
