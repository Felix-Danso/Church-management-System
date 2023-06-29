import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosPrivate } from '../../Utility/axios';
import { alerts } from '../../Utility/alerts';

const initialState = {
    status: 'idle',
    total_members: '',
    total_departments: '',
    total_amount: '',
    
};

export const fetchCardStatus = createAsyncThunk('fetchCards/admin', async (_, { dispatch }) => {
    // const user = JSON.parse(localStorage.getItem('user'));
    try {
        const response = await axiosPrivate.get('/dashboard/total');
        dispatch(setTotal_members(response.data.members_count));
        dispatch(setTotal_amount(response.data.amount_count));
        dispatch(setTotal_departments(response.data.departments_count));
    } catch (error) {
        alerts('error', error?.response.data.detail || error?.message);
    }
});

export const cardsSlice = createSlice({
    name: 'doctor',
    initialState,
    reducers: {
        setTotal_members: (state, action) => {
            state.total_members = action.payload;
        },
        setTotal_departments: (state, action) => {
            state.total_departments = action.payload;
        },
        setTotal_amount: (state, action) => {
            state.total_amount = action.payload;
        },

    },
    extraReducers(builder) {
        builder
            .addCase(fetchCardStatus.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchCardStatus.fulfilled, (state, action) => {
                state.status = 'succeeded';
            })
            .addCase(fetchCardStatus.rejected, (state, action) => {
                state.status = 'failed';
            });
    },
});

export const { setTotal_members, setTotal_amount, setTotal_departments,} = cardsSlice.actions;

export default cardsSlice.reducer;
