import React from 'react';

const Register = () => (
  <div className='container'>
    <h2>Please Register</h2>
    <div className='row'>
      <div className='col-md-4'>
        <label>Name</label>
        <input type='text'/>
      </div>
      <row>
        <div className='col-md-4'>
          <label>Email</label>
          <input type='email'/>
        </div>
      </row>
    </div>
    <div className='row'>
      <div className='col-md-4'>
        <label>Password</label>
        <input type='password' />
      </div>
    </div>
    <div className='row'>
      <button type='submit'>Submit</button>
    </div>
  </div>
);

export default Register;
