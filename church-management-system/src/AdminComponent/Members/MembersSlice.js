import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { alerts } from '../../Utility/alerts';
import { axiosPrivate } from '../../Utility/axios';

const initialState = {
    members: [],
    status: 'idle',
    selectedMember: null,
    selectedDoctorStatus: 'idle',
    searchField: '',
    isModalOpen: false,
    deleteStatus: 'idle',
    activateStatus: 'idle',
    deactivateStatus: 'idle',
    editModal: null,
    activateModal: null,
    deactivateModal: null,
};

export const fetchAllMembers = createAsyncThunk('fetchmembers/admin', async (id, { dispatch }) => {
    try {
        const response = await axiosPrivate.get(`/dashboard/all-members/${1}`);
        dispatch(setMembers(response.data.data));
        dispatch(setCount(response.data.count));
        return;
    } catch (error) {
        alerts('error', error?.response.data.detail || error?.message);
    }
});

export const addNewMember = createAsyncThunk('addNewMember/admin', async (id, { dispatch }) => {
    try {
        const response = await axiosPrivate.post(`/dashboard/add-church-member/`);
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
    async (email, { dispatch }) => {
        try {
            const response = await axiosPrivate.post(`/dashboard//`, { email });
            dispatch(setStatus({ email: email, status: 'Active' }));
            dispatch(setActivateModal(null));
            alerts('success', response.data.detail);
        } catch (error) {
            alerts('error', error?.response.data.detail || error?.message);
        }
    },
);

export const deactivateMember = createAsyncThunk(
    'deactivateDoctor/admin',
    async (id, { dispatch }) => {
        try {
            const response = await axiosPrivate.post('/dashboard/deactivate-church-member/');
            dispatch(setStatus({ church_member_id:id , status: 'Inactive' }));
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
        // removeDoctor: (state, action) => {
        //     const doctorsEmails = [...state.inviteList];
        //     doctorsEmails.splice(action.payload, 1);
        //     state.inviteList = doctorsEmails;
        // },
        setEditModal: (state, action) => {
            state.deleteModal = action.payload;
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
            const { email, status } = action.payload;
            const findDoctor = state.doctors.find((doctor) => doctor.email === email);
            findDoctor.status = status;
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
                state.selectedDoctorStatus = 'loading';
            })
            .addCase(addNewMember.fulfilled, (state, action) => {
                state.selectedDoctorStatus = 'succeeded';
            })
            .addCase(addNewMember.rejected, (state, action) => {
                state.selectedDoctorStatus = 'failed';
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
            });
    },
});

export const {
    setMembers,
    setCount,
    selectedMember,
    closeSelectedMember,
    setSearchField,
    setSpeciality,
    setIsModalOpen,
    setInviteList,
    removeDoctor,
    clearInviteList,
    setEditModal,
    setActivateModal,
    setDeactivateModal,
    updateMembers,
    setStatus,
} = adminMembersSlice.actions;

export default adminMembersSlice.reducer;
