import React, { useRef } from 'react';
import './Layout.css';
import { Outlet,useNavigate,useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../Navbar/Navbar';
import { USER_STATUS, autoLogin } from '../../features/userSlice';
import { ToastContainer } from 'react-toastify';

function Layout() {

  const status = useSelector(state => state.user.status);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tried = useRef(false);

  const myblog_token = JSON.parse(localStorage.getItem('myblog-token'));

  if (!tried.current && status === USER_STATUS.loggedout) {
    if (myblog_token)
      dispatch(autoLogin({...myblog_token,navigate,to : location.pathname}));

    tried.current = true;
  }


  return (
    <>
    <ToastContainer />
      {
        status === USER_STATUS.loading ?
          <div>Loading ...</div> :
          <>
            <Navbar />
            <div style={{
              overflowX : 'hidden',
              overflowY : 'auto',
              minHeight : '40vh',
              position : 'relative'
            }}>
              <Outlet />
            </div>
          </>
      }

    </>
  )
}

export default Layout