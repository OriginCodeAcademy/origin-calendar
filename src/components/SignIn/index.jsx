import React, { Component } from 'react';
import axios from 'axios';

class SignIn extends Component {
  constructor(props) {
    super(props);

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
    })
    .then((res) =>{
      const userId = res.data.userId;
      axios.get(`/api/Visitors/${userId}`)
      .then((user) => {
        this.props.save(res.data, user.data)
      })
    });
  }

  render() {
    const { username, password } = this.state;
    return (
      <div className='form'>
        <h2>Please Sign In</h2>
        <div className="form-group">
          <label>Email</label>
          <input type='text' name='username' className="form-control" value={username} onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type='password' name='password' className="form-control" value={password} onChange={this.handleChange} />
        </div>
        <button type='submit' className="btn btn-info" onClick={this.handleSubmit}>Submit</button>
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
