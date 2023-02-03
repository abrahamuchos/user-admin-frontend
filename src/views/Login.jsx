import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className='login-signup-form animated fadeInDown'>
      <div className='form'>
        <form action='' onSubmit={handleSubmit}>
          <h1 className='title'>Login into your account</h1>
          <input type='email' placeholder='Email' />
          <input type='password' placeholder='Password' />
          <button className='btn btn-block'>Login</button>
          <p className='message'>
            Not registered? <Link to='/signup'>Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
