import {Navigate} from "react-router";

export const ProtectAuthRoutes = ({ children}) => {
    const isAuthenticated = localStorage.getItem('token')

    if(isAuthenticated) {
        return <Navigate to='/dashboard/members' replace/>
    }

    return children
}

export const ProtectRoutes = ({ children}) => {
    const isAuthenticated = localStorage.getItem('token')

    if(isAuthenticated) {
        return children
    }

    return  <Navigate to='/login' replace/>
}
