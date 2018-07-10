import React, { Component } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import Home from '../Home';
import Appointments from '../Appointments';
import Register from '../Register';
import SignIn from '../SignIn';
import Request from '../Request';

class App extends Component{
  constructor(props){
    super(props)
    this.state ={
      user: null,
      token: null
    }
    this.saveUser= this.saveUser.bind(this)
  }

  saveUser(token, user){
    this.setState({ token, user })

  }

  render() {
    return(
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#"><svg width="40" height="27"><g fill="cornflowerblue" fill-rule="evenodd"><path fill="darkslategray" d="M29.3 14.6v5.1l-9.4 3.7-9.4-3.7v-5.2l-2.8-1.2v7.4c0 .6.3 1.2.9 1.4l10.8 4.3.5.1.6-.1 10.8-4.3c.6-.2 1-.8 1-1.4v-7.4l-3 1.3"></path><path d="M23.5 15a1.5 1.5 0 0 1-.5-2.8l11.2-4.7L23 2.8a1.5 1.5 0 0 1 1-2.7l14.5 6a1.5 1.5 0 0 1 0 2.8l-14.5 6-.6.1M16 15l-.5-.1-14.6-6A1.5 1.5 0 0 1 1 6l14.6-6a1.5 1.5 0 1 1 1 2.7L5.4 7.5l11.3 4.7c.7.3 1.1 1.1.8 1.9-.2.6-.8 1-1.4 1"></path></g></svg></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <Link to="/">Home</Link>
          </li>
          <li class="nav-item">
            <Link to="/register">Register</Link>
          </li>
          <li class="nav-item">
            <Link to="/appointments">Appointments</Link>
          </li>
          <li class="nav-item">
            <Link to="/signin">Sign In</Link>
          </li>
          <li class="nav-item">
            <Link to="/request">Request</Link>
          </li>
        </ul>
      </div>
    </nav>

    <div className="container-fluid">
      <Route exact path="/" component={Home}></Route>
      <Route path="/appointments" component={Appointments}></Route>
      <Route path="/register" component={Register}></Route>
      <Route path="/signin" render={(props) => <SignIn {...props} save={this.saveUser} />}></Route>
      <Route path="/request" component={Request}></Route>
    </div>
  </div>
    )
  }
}

export default App;
