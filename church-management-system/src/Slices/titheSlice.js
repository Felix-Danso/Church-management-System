import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {alerts} from "../Utility/alerts";
import {axiosPrivate} from "../Utility/axios";

const initialState = {
    tithes: [],
    totalPages: 0,
    department: null,
    memberOptions: [],
    departmentsOptionsValues: [],
    status: 'idle',
    searchField: '',
    isAddModalOpen: false,
    isAdding: 'idle',
    deleteStatus: 'idle',
    editModal: null,
    deleteModal: null,
    editStatus: 'idle',
    isEditModalOpen: false,
    isLoadingMembers: false,
    editTithe: null
};

export const fetchAllTithes = createAsyncThunk('fetchAllDepartments', async (params, { dispatch }) => {
    try {
        const response = await axiosPrivate.post(`dashboard/all-tithes/1/`, {search: params.search});
        dispatch(setTithes(response.data.data))
        dispatch(setTotalPages(response.data.total_pages))
    } catch (error) {
        alerts('error', error?.response.data.detail || error?.message);
    }
});

export const addNewTithe = createAsyncThunk('addNewTithe', async (titheInfo, { dispatch }) => {
    try {
        const response = await axiosPrivate.post(`dashboard/add-member-tithes/`, titheInfo);
        dispatch(fetchAllTithes())
        dispatch(setIsAddModalOpen())
        alerts('success', response.data.detail);
    } catch (error) {
        alerts('error', error?.response.data.detail || error?.message);
    }
});


export const fetchMembers = createAsyncThunk('fetchMembers', async (_, { dispatch }) => {
    try {
        const response = await axiosPrivate.post(`dashboard/all-members/1/`, {search_param: ''});
        dispatch(setMemberOptions(response.data.data))
    } catch (error) {
        alerts('error', error?.response.data.detail || error?.message);
    }
});

export const editTithe = createAsyncThunk('editTithe', async (titheInfo, { dispatch }) => {
    try {
        const response = await axiosPrivate.post(`dashboard/edit-member-tithes/`, titheInfo);
        dispatch(fetchAllTithes())
        dispatch(setEditModal())
        alerts('success', response.data.detail);
    } catch (error) {
        alerts('error', error?.response.data.detail || error?.message);
    }
});

export const tithesSlice = createSlice({
    name: 'tithes',
    initialState,
    reducers: {
        setTithes(state, action) {
            state.tithes = action.payload
        },
        setMemberOptions(state, action) {
            state.memberOptions = action.payload.map(member => {
                return {name: member.full_name, value: member.id}
            })
        },
        setIsAddModalOpen(state, action) {
            state.isAddModalOpen = !state.isAddModalOpen
        },
        setDeleteModal(state, action) {
            state.deleteModal = action.payload
        },
        setEditModal(state, action) {
            state.isEditModalOpen = !state.isEditModalOpen
        },
        setTotalPages(state, action) {
            state.totalPages = action.payload
        },
        setEditTithe(state, action) {
            state.editTithe = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchAllTithes.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchAllTithes.fulfilled, (state, action) => {
                state.status = 'succeeded';
            })
            .addCase(fetchAllTithes.rejected, (state, action) => {
                state.status = 'failed';
            })
            .addCase(addNewTithe.pending, (state, action) => {
                state.isAdding = 'loading';
            })
            .addCase(addNewTithe.fulfilled, (state, action) => {
                state.isAdding = 'succeeded';
            })
            .addCase(addNewTithe.rejected, (state, action) => {
                state.isAdding = 'failed';
            })
            .addCase(editTithe.pending, (state, action) => {
                state.editStatus = 'loading';
            })
            .addCase(editTithe.fulfilled, (state, action) => {
                state.editStatus = 'succeeded';
            })
            .addCase(editTithe.rejected, (state, action) => {
                state.editStatus = 'failed';
            })
            .addCase(fetchMembers.pending, (state, action) => {
                state.isLoadingMembers = 'loading';
            })
            .addCase(fetchMembers.fulfilled, (state, action) => {
                state.isLoadingMembers = 'succeeded';
            })
            .addCase(fetchMembers.rejected, (state, action) => {
                state.isLoadingMembers = 'failed';
            })

    },
});

export const {
    setMemberOptions, setTithes, setIsAddModalOpen, setDeleteModal
    , setTotalPages, setEditModal, setEditTithe
} = tithesSlice.actions;

export default tithesSlice.reducer;
