import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import PendingAppointments from './Pending';

const Calendar = () => (
  <div>
    <iframe src="https://calendar.google.com/calendar/embed?showTitle=0&amp;showNav=0&amp;showPrint=0&amp;mode=WEEK&amp;height=600&amp;wkst=2&amp;bgcolor=%23FFFFFF&amp;src=origincodeacademy.com_gdugpd1miakjeav6fcibgtggd0%40group.calendar.google.com&amp;color=%23711616&amp;ctz=America%2FLos_Angeles" width="100%" height="600" frameBorder="0" scrolling="no"></iframe>
  </div>
);


class Appointments extends Component {
  constructor() {
    super();
    this.state = {
      appointments: []
    };

    this.handleRemoveConfirmed = this.handleRemoveConfirmed.bind(this);

  }


  handleRemoveConfirmed(e) {

    const id = e.currentTarget.getAttribute('id');
    const studentEmail = e.currentTarget.getAttribute('email');
    const instructorId = e.currentTarget.getAttribute('instructorId');
    const time = e.currentTarget.getAttribute('time');
    const studentName = e.currentTarget.getAttribute('studentName');
  
 

        axios.post('/api/BookedApts/removedConfirmed', {
          email: `${instructorId}@origincodeacademy.com`,
          time: time,
          studentName: studentName
        })
          .then(function (response) {

          })
          .catch(function (error) {
            console.log(error, "error");
          });


    var deleted = this.state.appointments.filter(function (el) {
      return el.id != id
    });


    axios.delete(`/api/BookedApts/${id}`)
      .then((response) => {
        this.setState({
          appointments: deleted
        })
      })
      .catch((error) => {
        console.log(error)
      });

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
                  <th></th>
                </tr>
              </thead>
              <tbody className='table-striped'>

                {this.state.appointments.map((e) => {
                  return (
                    <tr>
                      <td>{e.studentName}</td>
                      <td>{moment(e.timeSlot).format('L')}</td>
                      <td>{moment(e.timeSlot).format('hh:mm a')}</td>
                      <td>{e.duration}</td>
                      <td>
                        <button class="btn btn-danger" instructorId={e.instructorId} email={e.email} studentName={e.studentName} id={e.id} time={e.timeSlot} onClick={this.handleRemoveConfirmed}>X</button>
                      </td>
                    </tr>
                  )
                })}
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
