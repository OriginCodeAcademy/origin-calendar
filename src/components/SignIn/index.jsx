import React, { Component } from 'react';
import axios from 'axios';

class SignIn extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    axios({
      method: 'post',
      url: '/api/Visitors/login',
      data: this.state
    });
  }

  render() {
    const { username, password } = this.state;
    return (
      <div className='container'>
        <h2>Please Sign In</h2>
        <div className='row'>
          <div className='col-md-4'>
            <label>username</label>
            <input type='text' name='username' value={username} onChange={this.handleChange} />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-4'>
            <label>Password</label>
            <input type='password' name='password' value={password} onChange={this.handleChange} />
          </div>
        </div>
        <div className='row'>
          <button type='submit' onClick={this.handleSubmit}>Submit</button>
        </div>
      </div>
    )
  }
}

// const SignIn = () => (
// <div className='container'>
//     <h2>Sign in</h2>
//     <div className='row'>
//       <div className='col-md-4'>
//         <label>Email</label>
//         <input type='email'/>
//       </div>
//     </div>
//     <div className='row'>
//       <div className='col-md-4'>
//         <label>Password</label>
//         <input type='password' />
//       </div>
//     </div>
//     <div className='row'>
//       <button type='submit'>Sign In</button>
//     </div>
//   </div>
// );

export default SignIn;
