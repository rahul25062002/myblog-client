import React from 'react';
import { Navigate,Outlet,useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { USER_STATUS } from '../../features/userSlice';

function ProtectedRoute() {
    const status = useSelector(state=>state.user.status);
    const location = useLocation();

    if( status===USER_STATUS.loggedin )
        return <Outlet />
    else 
        return <Navigate to={'/login'} state={{ to : location.pathname }} />
};

export default ProtectedRoute