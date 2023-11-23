import React, { useEffect, useRef } from 'react';
import './Auth.css';
import { NavLink, useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserJwt, USER_STATUS, loginUserGithub } from '../../features/userSlice';

function Login() {

  const [searchParams] = useSearchParams();
  const emailRef = useRef();
  const passwordRef = useRef();
  const GITHUB_CLIENT_ID = import.meta.env.VITE_APP_GITHUB_CLIENT_ID;
  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.user.status);
  const navigate = useNavigate();
  const location = useLocation();

  const codeParam = searchParams.get('code');
  console.log(codeParam);

  useEffect(() => {
    console.log('useEffect');
    if (codeParam && userStatus===USER_STATUS.loggedout){
      dispatch(loginUserGithub({
        codeParam,
        navigate,
        to: location?.state?.to || '/'
      }));
      console.log('dispatched');
    }

    ()=>{
      console.log(codeParam,'exit');
    }

  }, [codeParam]);

  const loginWithGithub = () => {
    window.location.assign(`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}`);
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    dispatch(loginUserJwt({
      email,
      password,
      navigate, 
      to: location?.state?.to || '/'
    }));
  }

  return (
    <div id='Auth'>
      <h1>Login User</h1>

      <form>
        <span className='form-input'>
          <input ref={emailRef}
            type="text" id="username" placeholder='Email' />

        </span>
        <span className="form-input">
          <input ref={passwordRef}
            type="password" placeholder='Password' />

        </span>
        <div>
          <button className='form-btn' data-btn='green'
            onClick={onSubmitHandler}
            disabled={userStatus === USER_STATUS.loading}
          >Submit</button>
          <button className='form-btn' data-btn='red'
            disabled={userStatus === USER_STATUS.loading}
          >Clear</button>
        </div>
      </form>

      <div id='form-alt'>
        <h4>Or Login Using</h4>
        {/* <button data-btn='blue' onClick={googleLogin}>Google</button> */}
        <button data-btn='black' onClick={loginWithGithub} >Github</button>
      </div>

      <p id='form-para'>Not Registered ? <NavLink to='/register'>Register Here</NavLink> </p>

    </div>
  )
}

export default Login