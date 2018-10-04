import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment'

class PendingAppointments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pending: []
    }
    this.handleRemoveApt = this.handleRemoveApt.bind(this);
  }

  handleRemoveApt(event) {
    const id = event.currentTarget.getAttribute('id');
    const instructorid = event.currentTarget.getAttribute('instructorid');
    const time = event.currentTarget.getAttribute('time');

    axios.post('/api/AptRequests/removeApt', {
      instructorId: instructorid,
      email: `${instructorid}@origincodeacademy.com`,
      time: time,
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error,"error");
      });
      
    var deleted = this.state.pending.filter(function (el) {
      return el.id != id
    });

    axios.delete(`/api/AptRequests/${id}`)
      .then((response) => {
        this.setState({
          pending: deleted
        })
      })
      .catch((error) => {
        console.log(error)
      });
  }

  componentDidMount() {
    if (!this.props.userId) return;
    const currentDate = new Date();
    const currentDateIsoFormat = currentDate.toISOString();
    axios.get(`/api/Visitors/${this.props.userId}/aptRequests?filter[where][time][gt]=` + currentDateIsoFormat)
      .then((response) => {
        this.setState({
          pending: response.data
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    return (
      <div>
      
        <h2>Pending Appointments</h2>

        {this.state.pending.length ? <table className='table'>
          <thead>
            <tr>
              <th>Summary</th>
              <th>Description</th>
              <th>Date</th>
              <th>Time</th>
              <th></th>
              
            </tr>
            
          </thead>
          <tbody className='table-striped'>

            {this.state.pending.map((e) => {
              return (
                <tr key={e.id}>
                  <td>{e.topicSummary}</td>
                  <td>{e.issueDescription}</td>
                  <td>{moment(e.time).format('L')}</td>
                  <td>{moment(e.time).format('hh:mm a')}</td>
                  <td>
                  <button className="btn btn-danger" instructorid={e.instructorid} email={e.email} studentname={e.studentname} id={e.id} time={e.time} onClick={this.handleRemoveApt}>X</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
          : <div className="alert alert-info">You haven't scheduled any appointments yet!</div>
        }
      </div>
    )
  }
}

export default PendingAppointments;
