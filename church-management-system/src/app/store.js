import { configureStore } from '@reduxjs/toolkit';
import AdminActionsReducer from '../Slices/AdminActionsSlice';
import  authenticatedReducer  from '../features/userSlice';
import adminMembersReducer  from '../AdminComponent/Members/MembersSlice';
import cardsReducer from '../Pages/Util/TotalMembersSlice';
import loginReducer from '../Slices/userSlice'
import dashboardStatsReducer from '../Slices/DashboardSlice'
import departmentsReducer from '../Slices/departmentSlice'
import tithesReducer from '../Slices/titheSlice'

export const store = configureStore({
    reducer: {
        adminActions: AdminActionsReducer,
        authenticated: authenticatedReducer,
        adminMembers :adminMembersReducer,
        cards:cardsReducer,
        login: loginReducer,
        dashboard: dashboardStatsReducer,
        departments: departmentsReducer,
        tithes: tithesReducer
    },
});
