import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

class AptRequests extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        authToken: {}
      },
      requests: [],
    }

    this.handleDelete = this.handleDelete.bind(this);
    this.handleApprove = this.handleApprove.bind(this);
    this.getGoogleAuth = this.getGoogleAuth.bind(this);
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

    axios.get(`/api/Visitors/${this.props.userId}`)
      .then(res => {
        this.setState({
          user: res.data
        })
        
        if (Object.keys(this.state.user.authToken).length > 0) {
          axios.post(`/api/Visitors/oAuth`, {
            user: this.state.user
          })
        } 
      })

  }

   handleDelete(event) {
    const id = event.currentTarget.getAttribute('id');
    const email = event.currentTarget.getAttribute('email');
    const time = event.currentTarget.getAttribute('time');
    axios.post(`/api/AptRequests/denyEmail`, {
      email: email,
      time: time
    })
      .then(function (response) {
      })
      .catch(function (error) {
        console.log(error);
      });
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
      });
  }

  handleApprove(e) {
    let slotId = null;
    let id = e.currentTarget.getAttribute('id');
    let requests = this.state.requests;
    for (let i = 0; i < requests.length; i++) {
      if (requests[i].id === id) {
        axios.post(`/api/BookedApts`, {
          "timeSlot": requests[i].time,
          "studentName": requests[i].studentName,
          "slotId": requests[i].slotId,
          "visitorId": requests[i].visitorId,
          "duration": 30
        }).then((res) => {
          axios.delete(`/api/Slots/${requests[i].slotId}`)
          .then((r) => {
          })
          .catch((e) => {
            console.log(e)
          })
        }).catch((err) => {
          console.log(err)
        })


      }
    }
    const email = e.currentTarget.getAttribute('email')
    const time = e.currentTarget.getAttribute('time')
    axios.post(`/api/AptRequests/approveEmail`, {
      email: email,
      time: time
    })
      .then(function (response) {
      })
      .catch(function (error) {
        console.log(error);
      });
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

  getGoogleAuth() {
    axios.post(`/api/Visitors/oAuth`, {
      user: this.state.user
    })
  }

  render() {
    return (
      <div>
        {
          (Object.keys(this.state.user.authToken).length != 0) ? 
          <span className='auth'/> :
          <button className='btn btn-info auth' onClick={this.getGoogleAuth}>Authenticate Calendar</button>
        }
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
                  <td>{moment(e.time).format('hh:mm a')}</td>
                  <td><button id={e.id} time={e.time} type='button' className='btn btn-success' email={e.email} onClick={this.handleApprove}>Approve</button></td>
                  <td><button id={e.id} time={e.time} visitorId={e.visitorId} type='button' className='btn btn-danger' email={e.email} onClick={this.handleDelete}>Deny</button></td>
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
