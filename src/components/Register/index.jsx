import React, { Component } from 'react';
import { Redirect } from 'react-router';
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
      data: { ...this.state, username: this.state.email }
    })
    .then((newUser) => {
      axios.post('/api/Visitors/login',{email: this.state.email, password: this.state.password})
        .then(token => this.props.save(token.data, newUser.data))
        .then(() => this.setState({
          alert: 'This is bannanananas! You\'ve registered successfully.',
          error: false,
        }))
        .then(setTimeout(() => this.setState({ loggedIn: true }), 1500));
    })
      .catch((err) => {
        this.setState({
          alert: 'Ya dun goofed! Missing required fields!',
          error: true
        })
      });
  }

  render() {
    const { firstName, lastName, email, password } = this.state;
    if (this.state.loggedIn) return <Redirect to='/request' />

    return (
      <div className='form'>
        <h2>Please Register</h2>
        {this.state.alert && <div className={`alert alert-${this.state.error ? 'danger' : 'success'}`}>{this.state.alert}</div>}
        <div className='form-group'>
          <label>First Name</label>
          <input type='text' name='firstName' className='form-control' value={firstName} onChange={this.handleChange} required />
        </div>
        <div className='form-group'>
          <label>Last Name</label>
          <input type='text' name='lastName' className='form-control' value={lastName} onChange={this.handleChange} required />
        </div>
        <div className='form-group'>
          <label>Email</label>
          <input type='email' name='email' className='form-control' value={email} onChange={this.handleChange} required />
        </div>

        <div className='form-group'>
          <label>Password</label>
          <input type='password' name='password' className='form-control' value={password} onChange={this.handleChange} required />
        </div>
        <button type='submit' className="btn btn-info" onClick={this.handleSubmit}>Submit</button>
      </div>
    )
  }
}

export default Register;
