import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {axiosPrivate} from "../Utility/axios"

const initialState = {
    totalMembers: 0,
    totalDepartments: 0,
    totalTithe: 0,
    status: 'idle'
};


export const getDashboardStats = createAsyncThunk(
    'dashboard/stats',
    async (_, { dispatch, rejectWithValue }) => {
        try{
            const response = await axiosPrivate.get('dashboard/total');
            dispatch(updateStats(response.data))
            return response.data;
        } catch (error) {
            if(error?.response && error?.response?.data.detail) {
                return rejectWithValue(error.response.data.detail)
            }
            return rejectWithValue(error.message)
        }
    });

export const dashboardStatsSlice = createSlice({
    name: 'dashboardStats',
    initialState,
    reducers: {
        updateStats (state, action) {
            state.totalMembers = action.payload.total_members;
            state.totalDepartments = action.payload.total_departments;
            state.totalTithe = action.payload.total_amount
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getDashboardStats.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(getDashboardStats.fulfilled, (state, action) => {
                state.status = 'succeeded';
            })
            .addCase(getDashboardStats.rejected, (state, action) => {
                state.status = 'failed';
            });
    },
});

export const {updateStats} = dashboardStatsSlice.actions

export default dashboardStatsSlice.reducer;
