import React, {useRef, useState} from "react";
import {Link} from "react-router-dom";
import axiosClient from "../axios-client";

import {useStateContext} from "../contexts/ContextProvider";

export default function Signup() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [errors, setErrors] = useState(null);
  const {setToken, setUser} = useStateContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmRef.current.value,
    };

    axiosClient
      .post("/signup", payload)
      .then(({data}) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors)
        }else{
          console.error(err);
          setErrors({
            errors: 'Please contact with admin'
          })
        }
      })

  };

  return (
    <div className='login-signup-form animated fadeInDown'>
      <form action='' className='form' onSubmit={handleSubmit}>
        <h1 className='title'>Signup for free</h1>
        {/* Inputs errors*/}
        {errors && <div className="alert">
          {Object.values(errors).map((row, index) => <p key={index}>{row}</p>)}
        </div>
        }
        <input ref={nameRef} type='text' placeholder='Full name'/>
        <input ref={emailRef} type='email' placeholder='Email'/>
        <input ref={passwordRef} type='password' placeholder='Password'/>
        <input
          ref={passwordConfirmRef}
          type='password'
          placeholder='Password confirmation'
        />
        <button className='btn btn-block'>Sign up</button>
        <p className='message'>
          All ready registered? <Link to='/login'>Sign in</Link>
        </p>
      </form>
    </div>
  );
}
