import React, { Component } from "react";
import ReactDOM from "react-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      title: ""
    };
  }
  
  render() {
    return (
      <h1>Hello world</h1>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
