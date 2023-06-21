import { configureStore } from '@reduxjs/toolkit';
import AdminActionsReducer from '../Slices/AdminActionsSlice';
import  authenticatedReducer  from '../features/userSlice';
import adminMembersReducer  from '../AdminComponent/Members/MembersSlice';

export const store = configureStore({
    reducer: {
        adminActions: AdminActionsReducer,
        authenticated: authenticatedReducer,
        adminMembers :adminMembersReducer,
    },
});
