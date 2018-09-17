import React, { Component } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import App from './components/App';

const Hello = () => "hello world";

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'));
