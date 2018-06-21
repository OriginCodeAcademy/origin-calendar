import React from 'react';

const SignIn = () => (
<div className='container'>
    <h2>Sign in</h2>
    <div className='row'>
      <div className='col-md-4'>
        <label>Email</label>
        <input type='email'/>
      </div>
    </div>
    <div className='row'>
      <div className='col-md-4'>
        <label>Password</label>
        <input type='password' />
      </div>
    </div>
    <div className='row'>
      <button type='submit'>Sign In</button>
    </div>
  </div>
);

export default SignIn;
