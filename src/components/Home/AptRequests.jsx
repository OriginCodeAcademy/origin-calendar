import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
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
      const time = e.currentTarget.getAttribute('time')
      const email = e.currentTarget.getAttribute('email')
      const instructorId = e.currentTarget.getAttribute('instructorId')
      let slotId = null;
      let id = e.currentTarget.getAttribute('id');
      let requests = this.state.requests;
    for (let i = 0; i < requests.length; i++) {
      // added && requests[i].time != time and else if
      //added instructorId 
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
      } else if (requests[i].time === time) {
        axios.post(`/api/AptRequests/replacedEmail`, {
          email: email,
          instructor: instructorId,
          time: time
        }).then((response) => {

        }).catch((e) => {
          console.log(e)
        })
      }
      
   //
  //
 //
//
    }
  // 
 // 
// 
     // time attribute here if failed
    // fuck that wont work cause its gonna not going to filter later
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
                  <td>{moment(e.time).format('hh:mm a')}</td>
                  <td><button id={e.id} time={e.time} type='button' className='btn btn-success' instructorId={e.instructorId} email={e.email} onClick={this.handleApprove}>Approve</button></td>
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
