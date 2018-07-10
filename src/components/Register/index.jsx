import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
  constructor() {
    super();

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    // const userData = Object.assign({}, this.state, {username: this.state.email});
    axios({
      method: 'post',
      url: '/api/Visitors',
      data: {...this.state, username: this.state.email}
    });
  }

  render() {
    const { firstName, lastName, email, password } = this.state;
    return (
      <div className='container'>
        <h2>Please Register</h2>
        <div className='row'>
          <div className='col-md-4'>
            <label>First Name</label>
            <input type='text' name='firstName' value={firstName} onChange={this.handleChange} />
          </div>
          <div className='col-md-4'>
            <label>Last Name</label>
            <input type='text' name='lastName' value={lastName} onChange={this.handleChange}/>
          </div>
          <row>
            <div className='col-md-4'>
              <label>Email</label>
              <input type='email' name='email' value={email} onChange={this.handleChange}/>
            </div>
          </row>
        </div>
        <div className='row'>
          <div className='col-md-4'>
            <label>Password</label>
            <input type='password' name='password' value={password} onChange={this.handleChange}/>
          </div>
        </div>
        <div className='row'>
          <button type='submit' onClick={this.handleSubmit}>Submit</button>
        </div>
      </div>
    )
  }
}

export default Register;
