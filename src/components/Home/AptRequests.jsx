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
    const time = e.currentTarget.getAttribute('time')
    const email = e.currentTarget.getAttribute('email')
    const instructorId = e.currentTarget.getAttribute('instructorId')
    const slotId = e.currentTarget.getAttribute('slotId')
    let id = e.currentTarget.getAttribute('id');
    let requests = this.state.requests;

    let booked = requests.find((book) => {
      return book.id === id
    })
    axios.post(`/api/BookedApts`, {
      "timeSlot": booked.time,
      "studentName": booked.studentName,
      "slotId": booked.slotId,
      "visitorId": booked.visitorId,
      "duration": 30
    })
      .then((res) => {
        for (let i = 0; i < requests.length; i++) {
          if (requests[i].time === time && requests[i].id !== booked.id) {
            axios.post(`/api/AptRequests/replacedApt`, {
              email: requests[i].email,
              time: requests[i].time
            })
          }
        }
        axios.delete(`/api/Slots/${booked.slotId}`)
          .then((r) => {
          })
          .catch((e) => {
            console.log(e)
          })
      }).catch((err) => {
        console.log(err)
      })



    axios.post(`/api/AptRequests/approveEmail`, {
      email: booked.email,
      time: booked.time
    })
      .then(function (response) {
      })
      .catch(function (error) {
        console.log(error);
      });
    let replaced = requests.filter((el) => {
      return el.time != time;
    });
    let deleted = requests.filter((le) => {
      return le.time === time;
    });
   let results= deleted.map(Apt => axios.delete(`/api/AptRequests/${Apt.id}`))
    return axios.all(results)
      .then((response) => {
        this.setState({
          requests: replaced
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
                <tr key={e.id}>
                  <td>{e.studentName}</td>
                  <td><strong>{e.topicSummary}</strong> - {e.issueDescription}</td>
                  <td>{moment(e.time).format('L')}</td>
                  <td>{moment(e.time).format('hh:mm a')}</td>
                  <td><button id={e.id} time={e.time} type='button' className='btn btn-success' email={e.email} onClick={this.handleApprove}>Approve</button></td>
                  <td><button id={e.id} time={e.time} visitor={e.visitorId} type='button' className='btn btn-danger' email={e.email} onClick={this.handleDelete}>Deny</button></td>
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
