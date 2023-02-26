import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client.js";

import {useStateContext} from '../contexts/ContextProvider';

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const {setToken, setUser} = useStateContext();
  const [errors, setErrors] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // setErrors(null);
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    }

    axiosClient.post('/login', payload)
      .then(({data})=>{
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err)=>{
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors)
        }else if(response && response.status === 401){
          setErrors({errors: response.data.message});
        }else{
          console.error(err);
          setErrors({
            errors: 'Upss! Something wrong, please try again'
          })
        }
      })
  };

  return (
    <div className='login-signup-form animated fadeInDown'>
      <div className='form'>
        <form action='' onSubmit={handleSubmit}>
          <h1 className='title'>Login into your account</h1>
          {/* Inputs errors*/}
          {errors && <div className="alert">
            {Object.values(errors).map((row, index) => <p key={index}>{row}</p>)}
          </div>
          }
          <input ref={emailRef} type='email' placeholder='Email' />
          <input ref={passwordRef} type='password' placeholder='Password' />
          <button className='btn btn-block'>Login</button>
          <p className='message'>
            Not registered? <Link to='/signup'>Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
