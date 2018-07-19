import React, { Component } from 'react';
import SignIn from '../SignIn'
import PendingAppointments from '../Appointments/Pending'
class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user, save } = this.props;
    if (user == null) {
      return (
        <div className="home">
          <video loop="true">
            <source src="https://www.origincodeacademy.com/wp-content/uploads/2017/09/typing-of-codes-2833-1.mp4" type="video/mp4" />
          </video>
          <h1 className="title">Welcome</h1>
          <SignIn save={save} />
        </div>
      )
    } else {
      return (
        <div className="home loggedIn container">
          <video loop="true">
            <source src="https://www.origincodeacademy.com/wp-content/uploads/2017/09/typing-of-codes-2833-1.mp4" type="video/mp4" />
          </video>
          <h1>Welcome, { user.firstName }</h1>
          <PendingAppointments userId={user.id} />
        </div>
      )
    }
  }
}

export default Home;
