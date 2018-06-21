import React, { Component } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import Calendar from '../Calendar';
import Listing from '../Listing';
import Register from '../Register';
import SignIn  from '../SignIn';
import Request from '../Request';

const App = () => (
  <div>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/register">Register</Link>
      <Link to="/calendar">Calendar</Link>
      <Link to="/listing">Listing</Link>
      <Link to="/signin">Sign In</Link>
      <Link to="/request">Request</Link>

    </nav>
    <div>
      <Route exact path="/" component={() => 'nothing'}></Route>
      <Route path="/calendar" component={Calendar}></Route>
      <Route path="/listing" component={Listing}></Route>
      <Route path="/register" component={Register}></Route>
      <Route path="/signin" component={SignIn}></Route>
      <Route path="/request" component={Request}></Route>
    </div>
  </div>);

export default App;
