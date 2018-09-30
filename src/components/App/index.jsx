import React, { Component } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import Home from '../Home';
import Appointments from '../Appointments';
import Register from '../Register';
import SignIn from '../SignIn';
import Request from '../Request';
import Availability from '../AdminAvailability';
import axios from 'axios';

class App extends Component{
  constructor(props){
    super(props)
    this.state ={
      user: null,
      token: null,
      isAdmin: null,
      oAuthToken: null,
    }
    this.saveUser = this.saveUser.bind(this);
    this.setAdminStatus = this.setAdminStatus.bind(this);
    this.setInput = this.setInput.bind(this);
    this.getGoogleAuth = this.getGoogleAuth.bind(this);
  }

  saveUser(token, user){
      this.setState({ token, user })
  }

  setAdminStatus(isAdmin) {
    this.setState({ isAdmin })
  }

  setInput(e) {
    this.setState({
      oAuthToken: e.target.value
    })
  }

  getGoogleAuth() {
    let user = this.state.user;
    axios.post(`/api/Visitors/oAuth`, {
      user: user,
    });
  }

  render() {
    return(
      <div>
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
          <a className="navbar-brand" href="#"><svg width="40" height="27"><g fill="cornflowerblue" fillRule="evenodd"><path fill="darkslategray" d="M29.3 14.6v5.1l-9.4 3.7-9.4-3.7v-5.2l-2.8-1.2v7.4c0 .6.3 1.2.9 1.4l10.8 4.3.5.1.6-.1 10.8-4.3c.6-.2 1-.8 1-1.4v-7.4l-3 1.3"></path><path d="M23.5 15a1.5 1.5 0 0 1-.5-2.8l11.2-4.7L23 2.8a1.5 1.5 0 0 1 1-2.7l14.5 6a1.5 1.5 0 0 1 0 2.8l-14.5 6-.6.1M16 15l-.5-.1-14.6-6A1.5 1.5 0 0 1 1 6l14.6-6a1.5 1.5 0 1 1 1 2.7L5.4 7.5l11.3 4.7c.7.3 1.1 1.1.8 1.9-.2.6-.8 1-1.4 1"></path></g></svg></a>
          <div id="navbarNav">
            <ul className="nav-flex">
              <li className="nav-item active">
                <Link to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/appointments">Appointments</Link>
              </li>
              { this.state.user && (this.state.isAdmin === false) ?
                <li className="nav-item">
                  <Link to="/request">Request</Link>
                </li>
                :
                this.state.user && (this.state.isAdmin) ?
                  <li className="nav-item">
                    <Link to="/availability">Availability</Link>
                    <button className='btn btn-danger auth' onClick={this.getGoogleAuth}>Auth Calendar</button>
                  </li>
                :
                  <React.Fragment>
                    <li className="nav-item">
                      <Link to="/signin">Sign In</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/register">Register</Link>
                    </li>
                  </React.Fragment>
              }
            </ul>
          </div>
        </nav>

        <div className="container-fluid">
          <Route exact path="/" render={(props) => <Home {...props} user={this.state.user} save={this.saveUser} isAdmin={this.state.isAdmin} setAdminStatus={this.setAdminStatus} />}></Route>
          <Route path="/appointments" render={(props) => <Appointments {...props} user={this.state.user} />}></Route>
          <Route path="/register" render={(props) => <Register {...props} save={this.saveUser} setAdminStatus={this.setAdminStatus} isAdmin={this.state.isAdmin} />}></Route>
          <Route path="/signin" render={(props) => <SignIn {...props} save={this.saveUser} setAdminStatus={this.setAdminStatus} />}></Route>
          <Route path="/request" render={(props) => <Request {...props} user={this.state.user || null} />} ></Route>
          <Route path="/availability" render = {(props) => <Availability {...props} user={this.state.user} />} ></Route>
        </div>
      </div>
    )
  }
}

export default App;
