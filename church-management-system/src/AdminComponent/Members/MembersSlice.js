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
    fetchSpecialityStatus: 'idle',
    deleteStatus: 'idle',
    activateStatus: 'idle',
    deactivateStatus: 'idle',
    deleteModal: null,
    activateModal: null,
    deactivateModal: null,
};

export const fetchAllMembers = createAsyncThunk('fetchmembers/admin', async (_, { dispatch }) => {
    try {
        const response = await axiosPrivate.get('/all-members/');
        dispatch(members(response.data.data));
    } catch (error) {
        alerts('error', error?.response.data.detail || error?.message);
    }
});

export const fetchMember = createAsyncThunk('fetchMember/admin', async (id, { dispatch }) => {
    dispatch(selectedMember(null));
    try {
        const response = await axiosPrivate.get(`/all-members/${id}`);
        dispatch(selectedMember(response.data.data[0]));
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
        dispatch(setDeleteModal(null));
        alerts('success', response.data.detail);
    } catch (error) {
        alerts('error', error?.response.data.detail || error?.message);
    }
});

export const activateMember = createAsyncThunk(
    'activateMember/admin',
    async (email, { dispatch }) => {
        try {
            const response = await axiosPrivate.post(`/doctor/activate-doctor/`, { email });
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
    async (email, { dispatch }) => {
        try {
            const response = await axiosPrivate.post(`/doctor/deactivate-doctor/`, { email });
            dispatch(setStatus({ email: email, status: 'Inactive' }));
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
        members: (state, action) => {
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
        setDeleteModal: (state, action) => {
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
            .addCase(fetchMember.pending, (state, action) => {
                state.selectedDoctorStatus = 'loading';
            })
            .addCase(fetchMember.fulfilled, (state, action) => {
                state.selectedDoctorStatus = 'succeeded';
            })
            .addCase(fetchMember.rejected, (state, action) => {
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
    members,
    selectedMember,
    closeSelectedMember,
    setSearchField,
    setSpeciality,
    setIsModalOpen,
    setInviteList,
    removeDoctor,
    clearInviteList,
    setDeleteModal,
    setActivateModal,
    setDeactivateModal,
    updateMembers,
    setStatus,
} = adminMembersSlice.actions;

export default adminMembersSlice.reducer;
