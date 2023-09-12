import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {alerts} from "../Utility/alerts";
import {axiosPrivate} from "../Utility/axios";

const initialState = {
    departments: [],
    totalDepartments: 0,
    department: null,
    departmentOptions: [],
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
};

export const fetchAllDepartments = createAsyncThunk('fetchAllDepartments', async (params, { dispatch }) => {
    try {
        const response = await axiosPrivate.post(`dashboard/all-departments/${params.currentPage}/`, {search_param: params.search});
        dispatch(setDepartments(response.data.data))
        dispatch(setTotalDepartments(response.data.total_pages))
        dispatch(setDepartmentOptions(response.data.data))
    } catch (error) {
        alerts('error', error?.response.data.detail || error?.message);
    }
});

export const fetchDepartments = createAsyncThunk('fetchDepartments', async (_, { dispatch }) => {
    try {
        const response = await axiosPrivate.get(`dashboard/departments/`);
        dispatch(setDepartments(response.data.data))
        dispatch(setTotalDepartments(response.data.total_pages))
        dispatch(setDepartmentOptions(response.data.data))
    } catch (error) {
        alerts('error', error?.response.data.detail || error?.message);
    }
});

export const addNewDepartment = createAsyncThunk('addNewDepartment', async (departmentInfo, { dispatch }) => {
    try {
        const response = await axiosPrivate.post(`dashboard/add-departments/`, departmentInfo);
        dispatch(fetchAllDepartments({currentPage: 1, search: ''}))
        dispatch(setIsAddModalOpen())
        alerts('success', response.data.detail);
    } catch (error) {
        alerts('error', error?.response.data.detail || error?.message);
    }
});

export const deleteDepartment = createAsyncThunk('deleteDepartment', async (id, { dispatch }) => {
    try {
        const response = await axiosPrivate.delete(`dashboard/delete-departments/${id}/`);
        dispatch(fetchAllDepartments())
        dispatch(setDeleteModal(null))
        dispatch(fetchAllDepartments({currentPage: 1, search: ''}))
        alerts('success', response.data.detail);
    } catch (error) {
        alerts('error', error?.response.data.detail || error?.message);
    }
});

export const editDepartment = createAsyncThunk('editDepartment', async (departmentInfo, { dispatch }) => {
    try {
        const response = await axiosPrivate.post(`dashboard/edit-departments/`, departmentInfo);
        dispatch(fetchAllDepartments({currentPage: 1, search: ''}))
        dispatch(setEditModal())
        alerts('success', response.data.detail);
    } catch (error) {
        alerts('error', error?.response.data.detail || error?.message);
    }
});

export const departmentsSlice = createSlice({
    name: 'departments',
    initialState,
    reducers: {
        setDepartments(state, action) {
            state.departments = action.payload
        },
        setDepartmentOptions(state, action) {
            state.departmentOptions = action.payload.map(department => {
                return {name: department.name, value: department.id}
            })
            state.departmentsOptionsValues = action.payload.map(department => {
                return {name: department.name, value: department.name}
            })
        },
        setIsAddModalOpen(state, action) {
            state.isAddModalOpen = !state.isAddModalOpen
        },
        setDeleteModal(state, action) {
            state.deleteModal = action.payload
        },
        setEditDepartment(state, action) {
            state.department = action.payload
        },
        setEditModal(state, action) {
            state.isEditModalOpen = !state.isEditModalOpen
        },
        setTotalDepartments(state, action) {
            state.totalDepartments = action.payload
        },
        setSearchField: (state, action) => {
            state.searchField = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchAllDepartments.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchAllDepartments.fulfilled, (state, action) => {
                state.status = 'succeeded';
            })
            .addCase(fetchAllDepartments.rejected, (state, action) => {
                state.status = 'failed';
            })
            .addCase(addNewDepartment.pending, (state, action) => {
                state.isAdding = 'loading';
            })
            .addCase(addNewDepartment.fulfilled, (state, action) => {
                state.isAdding = 'succeeded';
            })
            .addCase(addNewDepartment.rejected, (state, action) => {
                state.isAdding = 'failed';
            })
            .addCase(deleteDepartment.pending, (state, action) => {
                state.deleteStatus = 'loading';
            })
            .addCase(deleteDepartment.fulfilled, (state, action) => {
                state.deleteStatus = 'succeeded';
            })
            .addCase(deleteDepartment.rejected, (state, action) => {
                state.deleteStatus = 'failed';
            })
            .addCase(editDepartment.pending, (state, action) => {
                state.editStatus = 'loading';
            })
            .addCase(editDepartment.fulfilled, (state, action) => {
                state.editStatus = 'succeeded';
            })
            .addCase(editDepartment.rejected, (state, action) => {
                state.editStatus = 'failed';
            })

    },
});

export const {
    setDepartmentOptions, setDepartments, setIsAddModalOpen, setDeleteModal
    , setEditDepartment, setEditModal, setTotalDepartments, setSearchField
} = departmentsSlice.actions;

export default departmentsSlice.reducer;
