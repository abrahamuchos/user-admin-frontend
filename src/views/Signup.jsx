import React, { useRef } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";

import { useStateContext } from "../contexts/ContextProvider";

export default function Signup() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { setToken, setUser } = useStateContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirm: passwordConfirmRef.current.value,
    };

    axiosClient
      .post("/signup", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status == 422) {
          console.log(response.data.errors);
        }
      });
  };

  return (
    <div className='login-signup-form animated fadeInDown'>
      <form action='' className='form' onSubmit={handleSubmit}>
        <h1 className='title'>Signup for free</h1>
        <input ref={nameRef} type='text' placeholder='Full name' />
        <input ref={emailRef} type='email' placeholder='Email' />
        <input ref={passwordRef} type='password' placeholder='Password' />
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
