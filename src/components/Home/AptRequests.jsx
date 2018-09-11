import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment'
import { request } from 'https';

class AptRequests extends Component {
  constructor(props) {
    super(props)
    this.state = {
      requests: []
    }
    this.handleDelete = this.handleDelete.bind(this)
    this.handleApprove = this.handleApprove.bind(this);
  }
   componentDidMount() {
    if (!this.props.userId) return;
    const currentDate = new Date();
    const currentDateIsoFormat = currentDate.toISOString();
    axios.get(`/api/AptRequests?filter[where][time][gt]=` + currentDateIsoFormat)
      .then((response) => {
        this.setState({
          requests: response.data
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }
   handleDelete(event) {
    var id = event.currentTarget.getAttribute('id');
    var deleted = this.state.requests.filter(function (el) {
      return el.id != id
    });
    axios.delete(`/api/AptRequests/${id}`)
      .then((response) => {
        this.setState({
          requests: deleted
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  handleApprove(e) {
    let id = e.currentTarget.getAttribute('id');
    let requests = this.state.requests;
    for (let i = 0; i < requests.length; i++) {
      if (requests[i].id === id) {
        axios.post(`/api/BookedApts`, {
          "timeSlot": requests[i].time,
          "studentName": requests[i].studentName,
          "slotId": requests[i].id,
          "visitorId": requests[i].visitorId,
          "duration": 30
        }).then((res) => {
        }).catch((err) => {
          console.log(err)
        });
      }
    }
    let deleted = requests.filter((el) => {
      return el.id != id;
    });
    axios.delete(`/api/AptRequests/${id}`)
    .then((response) => {
      this.setState({
        requests: deleted
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render() {
    return (
      <div>
        <h2>Appointment Requests</h2>
        {this.state.requests ? <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Date</th>
              <th>Time</th>
              <th>Approve</th>
              <th>Deny</th>
            </tr>
          </thead>
          <tbody className='table-striped'>
            {this.state.requests.map((e) => {
              return (
                <tr>
                  <td>{e.studentName}</td>
                  <td><strong>{e.topicSummary}</strong> - {e.issueDescription}</td>
                  <td>{moment(e.time).format('L')}</td>
                  <td>{moment(e.time).format('hh:MM a')}</td>
                  <td><button id={e.id} type='button' className='btn btn-success' onClick={this.handleApprove}>Approve</button></td>
                  <td><button type='button' className='btn btn-danger'>Deny</button></td>
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
export default AptRequests;
