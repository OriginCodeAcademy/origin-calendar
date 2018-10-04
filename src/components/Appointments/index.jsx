import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import PendingAppointments from './Pending';

const Calendar = () => (
  <div>
    <iframe src="https://calendar.google.com/calendar/embed?showTitle=0&amp;showNav=0&amp;showPrint=0&amp;mode=WEEK&amp;height=600&amp;wkst=2&amp;bgcolor=%23FFFFFF&amp;src=origincodeacademy.com_gdugpd1miakjeav6fcibgtggd0%40group.calendar.google.com&amp;color=%23711616&amp;ctz=America%2FLos_Angeles" width="100%" height="600" frameBorder="0" scrolling="no"></iframe>
  </div>
);

const Row = (props) => {
  const { appointment } = props;
  return (
    <tr>
      <td>{appointment.studentName}</td>
      <td>{moment(appointment.timeSlot).format('L')}</td>
      <td>{moment(appointment.timeSlot).format('hh:mm a')}</td>
      <td>{appointment.duration}</td>
    </tr>
  )
}

class Appointments extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    axios.get('/api/BookedApts')
    .then(res => {
      this.setState({
        appointments: res.data
      })
    })
  }

  render() {
    if (!this.state.appointments) return null;


    return (
      <div className='row'>
        { this.state.appointments &&
        <div className='col-lg-4 col-md-4 col-sm-12'>
            <PendingAppointments userId={this.props.user.id} user={this.props.user}/>
            <h2>Confirmed Appointments</h2>
            <table className='table'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody className='table-striped'>
                { this.state.appointments.map(singleApt => <Row key={singleApt.id} appointment={singleApt} />) }
              </tbody>
            </table>
          </div>
      }
        <div className='col-lg-8 col-md-8 col-sm-12'>
          <Calendar />
        </div>
      </div>
    );
  }
}

export default Appointments;
