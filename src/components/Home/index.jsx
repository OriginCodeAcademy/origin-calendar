import React, { Component } from 'react';
import axios from 'axios';
import SignIn from '../SignIn'
import PendingAppointments from '../Appointments/Pending'
import AptRequests from './AptRequests'
class Home extends Component {
  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  //   //if (!this.props.userId) return;
  //   const currentDate = new Date();
  //   const currentDateIsoFormat = currentDate.toISOString();
  //   axios.get(`/api/AptRequests?filter[where][time][gt]=` + currentDateIsoFormat)
  //     .then((response) => {
  //       console.log(response.data)
  //       this.setState({
  //         request: response.data
  //       })
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  // }

  render() {
    const { user, save } = this.props;
    if (user !== null) {console.log(user)}
    if (user !== null) {console.log(user.isAdmin)}
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
    } else if (user !== null && (user.isAdmin)) {
      return (
      <div className="home loggedIn container">
        <video loop="true">
          <source src="https://www.origincodeacademy.com/wp-content/uploads/2017/09/typing-of-codes-2833-1.mp4" type="video/mp4" />
        </video>
        <h1>Welcome, { user.firstName }</h1>
        <AptRequests userId={user.id} />
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
