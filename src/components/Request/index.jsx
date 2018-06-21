import React from 'react';

const Request = () => (
  <div className='container'>
    <h2>welcome message</h2>
    <div className='row'>
      <div className='col-md-9'>
        <label>Topic</label>
        <input type='text'/>
      </div>
      <div className='col-md-3'>
        <label>Time</label>
        <input type='text'/>
      </div>
    </div>
    <div className='row'>
      <div>
        <label>Description</label>
        <textarea rows='4' columns='50'></textarea>
      </div>
    </div>
    <div className='row'>
      <button type='submit'>Submit</button>
    </div>
  </div>
);

export default Request;
