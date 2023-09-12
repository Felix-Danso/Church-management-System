import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { alerts } from '../../Utility/alerts';
import { axiosPrivate } from '../../Utility/axios';

const initialState = {
    members: [],
    memberOptions: [],
    memberOptionsStatus: 'idle',
    totalMembers: 0,
    status: 'idle',
    selectedMember: null,
    addMemberStatus: 'idle',
    searchField: '',
    isModalOpen: false,
    deleteStatus: 'idle',
    activateStatus: 'idle',
    deactivateStatus: 'idle',
    editModal: null,
    activateModal: null,
    deactivateModal: null,
    editMember: {},
    editMemberStatus: 'idle',
    isEditModalOpen: false
};

export const fetchAllMembers = createAsyncThunk('fetchMembers/admin', async (params, { dispatch }) => {
    try {
        const response = await axiosPrivate.post(`/dashboard/all-members/${params.currentPage}/`, {search_param: params.search});
        dispatch(updateTotalMembers(response.data.church_members))
        dispatch(setMembers(response.data.data));
        dispatch(setCount(response.data.count));
    } catch (error) {
        alerts('error', error?.response.data.detail || error?.message);
    }
});

export const fetchMembers = createAsyncThunk('fetchAllMembers/admin', async (_,{ dispatch }) => {
    try {
        const response = await axiosPrivate.get(`/dashboard/members/`);
        dispatch(setMemberOptions(response.data.data))
    } catch (error) {
        alerts('error', error?.response.data.detail || error?.message);
    }
});
export const addNewMember = createAsyncThunk('addNewMember/admin', async (newMemberInfo, { dispatch }) => {
    try {
        const response = await axiosPrivate.post(`/dashboard/add-church-member/`, newMemberInfo);
        dispatch(fetchAllMembers({search: '', currentPage: 1}))
        dispatch(setIsModalOpen())
        alerts('success', response.data.detail);
    } catch (error) {
        alerts('error', error?.response.data.detail || error?.message);
    }
});

export const editMember = createAsyncThunk('editMember/admin', async (memberInfo, { dispatch }) => {
    try {
        const response = await axiosPrivate.post(`/dashboard/edit-church-member/`, memberInfo);
        dispatch(setIsModalOpen())
        dispatch(fetchAllMembers({search: '', currentPage: 1}))
        dispatch(setEditModal())
        dispatch(setIsModalOpen())
        alerts('success', response.data.detail);
    } catch (error) {
        alerts('error', error?.response.data.detail || error?.message);
    }
});

export const deleteMember = createAsyncThunk('deleteMember/admin', async (id, { dispatch }) => {
    const member_id = id;
    try {
        const response = await axiosPrivate.delete(`/doctor/delete-doctor/`, {
            data: { member_id },
        });
        dispatch(updateMembers(member_id));
        dispatch(setEditModal(null));
        alerts('success', response.data.detail);
    } catch (error) {
        alerts('error', error?.response.data.detail || error?.message);
    }
});

export const activateMember = createAsyncThunk(
    'activateMember/admin',
    async (id, { dispatch }) => {
        try {
            const response = await axiosPrivate.post(`/dashboard/activate-church-member/`,
                { church_member_id: id });
            dispatch(setStatus({ id: id, status: 'Active' }));
            dispatch(setActivateModal(null));
            alerts('success', response.data.detail);
        } catch (error) {
            alerts('error', error?.response.data.detail || error?.message);
        }
    },
);

export const deactivateMember = createAsyncThunk(
    'deactivateMember/admin',
    async (id, { dispatch }) => {
        try {
            const response = await axiosPrivate.post('/dashboard/deactivate-church-member/',
                {church_member_id: id});
            dispatch(setStatus({ id: id , status: 'Inactive' }));
            dispatch(setDeactivateModal(null));
            alerts('success', response.data.detail);
        } catch (error) {
            alerts('error', error?.response.data.detail || error?.message);
        }
    },
);

export const adminMembersSlice = createSlice({
    name: 'adminMembers',
    initialState,
    reducers: {
       setMembers: (state, action) => {
            state.members = action.payload;
        },
        selectedMember: (state, action) => {
            state.selectedMember = action.payload;
        },
        closeSelectedMember: (state, action) => {
            state.selectedMember = null;
        },
        setSearchField: (state, action) => {
            state.searchField = action.payload;
        },
        setIsModalOpen: (state, action) => {
            state.isModalOpen = !state.isModalOpen;
        },
        setEditModal: (state, action) => {
            state.isEditModalOpen = !state.isEditModalOpen;
        },
        setEditMember: (state, action) => {
           state.editMember = action.payload
        },
        setActivateModal: (state, action) => {
            state.activateModal = action.payload;
        },
        setDeactivateModal: (state, action) => {
            state.deactivateModal = action.payload;
        },
        updateMembers: (state, action) => {
            state.members = state.members.filter((member) => member.id !== action.payload);
        },
        setStatus: (state, action) => {
            const { id, status } = action.payload;
            const findMember = state.members.find((member) => member.id === id);
            findMember.status = status;
        },
        updateTotalMembers: (state, action) => {
           state.totalMembers = action.payload
        },
        setSearchMembers: (state, action) => {
           state.searchField = action.payload
        },
        setMemberOptions(state, action) {
            state.memberOptions = action.payload.map(member => {
                return {name: member.full_name, value: member.full_name}
            })
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchAllMembers.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchAllMembers.fulfilled, (state, action) => {
                state.status = 'succeeded';
            })
            .addCase(fetchAllMembers.rejected, (state, action) => {
                state.status = 'failed';
            })
            .addCase(addNewMember.pending, (state, action) => {
                state.addMemberStatus = 'loading';
            })
            .addCase(addNewMember.fulfilled, (state, action) => {
                state.addMemberStatus = 'succeeded';
            })
            .addCase(addNewMember.rejected, (state, action) => {
                state.addMemberStatus = 'failed';
            })
            .addCase(deleteMember.pending, (state, action) => {
                state.deleteStatus = 'loading';
            })
            .addCase(deleteMember.fulfilled, (state) => {
                state.deleteStatus = 'succeeded';
            })
            .addCase(deleteMember.rejected, (state, action) => {
                state.deleteStatus = 'failed';
            })
            .addCase(activateMember.pending, (state, action) => {
                state.activateStatus = 'loading';
            })
            .addCase(activateMember.fulfilled, (state, action) => {
                state.activateStatus = 'succeeded';
            })
            .addCase(activateMember.rejected, (state, action) => {
                state.activateStatus = 'failed';
            })
            .addCase(deactivateMember.pending, (state, action) => {
                state.deactivateStatus = 'loading';
            })
            .addCase(deactivateMember.fulfilled, (state, action) => {
                state.deactivateStatus = 'succeeded';
            })
            .addCase(deactivateMember.rejected, (state, action) => {
                state.deactivateStatus = 'failed';
            })
            .addCase(editMember.pending, (state, action) => {
                state.editMemberStatus = 'loading';
            })
            .addCase(editMember.fulfilled, (state, action) => {
                state.editMemberStatus = 'succeeded';
            })
            .addCase(editMember.rejected, (state, action) => {
                state.editMemberStatus = 'failed';
            })
            .addCase(fetchMembers.pending, (state, action) => {
                state.memberOptionsStatus = 'loading';
            })
            .addCase(fetchMembers.fulfilled, (state, action) => {
                state.memberOptionsStatus = 'succeeded';
            })
            .addCase(fetchMembers.rejected, (state, action) => {
                state.memberOptionsStatus = 'failed';
            });
    },
});

export const {
    setMembers,
    setCount,
    setSearchField,
    setEditModal,
    setEditMember,
    setActivateModal,
    setDeactivateModal,
    updateMembers,
    setStatus,
    setIsModalOpen,
    updateTotalMembers,
    setSearchMembers,
    setMemberOptions
} = adminMembersSlice.actions;

export default adminMembersSlice.reducer;
