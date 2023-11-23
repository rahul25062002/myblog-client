import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import './Auth.css';
import { NavLink } from 'react-router-dom';
import Adduser from '../../assets/adduser.svg';
import { registerUserJwtApi, uploadImageApi } from '../../api/auth';
import Loading from '../../assets/Loading';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { useDispatch } from 'react-redux';
// import { registerUserJwt } from '../../api/auth';


function Register() {

  const [avatar, setAvatar] = useState(Adduser);
  const navigate = useNavigate();
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const confirmPassRef = useRef();
  const [formLoading, setFormLoading] = useState(false);

  const uploadImage = async (event) => {
    const image = event.target.files[0];
    try {
      setAvatar('LOADING');
      setFormLoading(true);

      const image_url = await uploadImageApi(image);

      setAvatar(image_url);
      setFormLoading(false);

    } catch (error) {
      setFormLoading(false);
      setAvatar(Adduser);
      console.log('error catched');
    }
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const test = emailTest() && usernameTest() && passwordTest() && cnfPasswordTest();

    if (!test) {
      alert('all the inputs must be error free');
      return;
    }

    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    const username = usernameRef.current.value.trim();
    await registerUserJwtApi({ email, password, username, avatar, navigate });

  }

  const onClearHandler = (event) => {
    event.preventDefault();
    setAvatar(Adduser);
    const selector = document.querySelectorAll('.form-input');

    selector.forEach(elem => {
      elem.firstChild.value = "";
      elem.classList.remove('error')
      elem.classList.remove('success');
      elem.style.setProperty('--aftercontent', '');
    })
  };

  const keyUpHandler = (event, test, invalidText) => {
    const parentInput = event.target.parentNode;
    if (test) {
      parentInput.style.setProperty('--aftercontent', "''");
      parentInput.classList.add('success');
      parentInput.classList.remove('error');
    }
    else if (!parentInput.classList.contains('error')) {
      parentInput.style.setProperty('--aftercontent', `'${invalidText}'`);
      parentInput.classList.add('error');
      parentInput.classList.remove('success');
    }
  }

  const emailTest = () => {
    const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    const test = emailRegex.test(emailRef.current.value.trim());
    return test;
  }

  const passwordTest = () => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const test = passwordRegex.test(passwordRef.current.value.trim());
    return test;
  }

  const cnfPasswordTest = () => {
    const pass = passwordRef.current.value.trim();
    const cnfPass = confirmPassRef.current.value.trim();

    return pass !== '' && pass === cnfPass;
  }

  const usernameTest = () => {
    const username = usernameRef.current.value.trim();
    // console.log(username.length)
    return username.length > 0;
  }

  return (
    <div id='Auth'>
      <h1>Register User</h1>

      <form>
        <span className='form-input '>
          <input ref={emailRef}
            onKeyUp={(event) => keyUpHandler(event, emailTest(), "* invalid email format")}
            type="text" placeholder='Email' />
        </span>

        <span className="form-input ">
          <input
            onKeyUp={(e) => keyUpHandler(e, usernameTest(), '* username can not be empty')}
            ref={usernameRef} type="text" placeholder='Username' />
        </span>

        <span className="form-input">
          <input
            onKeyUp={(e) => keyUpHandler(e, passwordTest(), '* min 8 char, at least one letter, one number and one special char')}
            ref={passwordRef} type="password" placeholder='Password' />

        </span>

        <span className="form-input">
          <input
            onKeyUp={(e) => keyUpHandler(e, cnfPasswordTest(), '* password did not match')}
            ref={confirmPassRef} type="password" placeholder='Confirm Password' />

        </span>

        <input type="file" accept="image/*"
          onChange={uploadImage}
          style={{ display: 'none' }} id='form-file' placeholder='my' />

        <label htmlFor="form-file" id='select_img'>
          {
            avatar === 'LOADING' ?
              <Loading /> :
              <img src={avatar} alt="" />

          }
          <span style={{ fontSize: 'var(--p)' }}>Profile Pic</span>
        </label>

        <div>
          <button className='form-btn'
            disabled={formLoading} data-btn='green'
            onClick={onSubmitHandler}>Submit</button>
          <button className='form-btn'
            disabled={formLoading} data-btn='red'
            onClick={onClearHandler}>Clear</button>
        </div>
      </form>

      <div id='form-alt'>
        <h4>Or Register Using</h4>
        <button data-btn='black' >Github</button>
      </div>
      <p id='form-para'>Already Regisered? <NavLink to='/login'>Login Here</NavLink> </p>

    </div>
  )
}

export default Register