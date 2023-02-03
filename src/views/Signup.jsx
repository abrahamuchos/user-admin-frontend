import React from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className='login-signup-form animated fadeInDown'>
      <form action='' className='form' onSubmit={handleSubmit}>
        <h1 className='title'>Signup for free</h1>
        <input type='text' placeholder='Full name' />
        <input type='email' placeholder='Email' />
        <input type='password' placeholder='Password' />
        <input type='password' placeholder='Password confirmation' />
        <button className='btn btn-block'>Sign up</button>
        <p className='message'>
          All ready registered? <Link to='/login'>Sign in</Link>
        </p>
      </form>
    </div>
  );
}
