import React, { Component } from 'react';
import SignIn from '../SignIn'

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
        <div className="home">
          <h1>Welcome, { user.firstName }</h1>
          <div className='upcoming-appointments'>
            <table>
              <th>
                <tr>

                </tr>
              </th>
            </table>
          </div>
        </div>
      )
    }
  }
}

export default Home;
