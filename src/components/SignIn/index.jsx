import React, { Component } from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit() {
    axios({
      method: 'post',
      url: '/api/Visitors/login',
      data: this.state
    })
      .then((res) => {
        const userId = res.data.userId;
        axios.get(`/api/Visitors/${userId}`)
          .then(user => this.props.save(res.data, user.data))
          .then(() => this.setState({
            alert: 'Awesome possum! You\'ve been logged in.',
            error: false,
          }))
          .then(setTimeout(() => this.setState({ loggedIn: true }), 1500))
          axios.get(`/api/Visitors/isAdminRole?id=${res.data.userId}`)
           .then(response => this.props.setAdminStatus(response.data))
      })
      .catch((err) => {
        this.setState({
          alert: 'Log-in failed! Please try again',
          error: true
        })
      })
      
  }

  render() {
    const { email, password } = this.state;
    if (this.state.loggedIn) return <Redirect to='/' />
    return (
      <div className='form'>
        <h2>Please Sign In</h2>
        {this.state.alert && <div className={`alert alert-${this.state.error ? 'danger' : 'success'}`}>{this.state.alert}</div>}
        <div className="form-group">
          <label>Email</label>
          <input type='text' name='email' className="form-control" value={email} onChange={this.handleChange} />
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

export default SignIn;
