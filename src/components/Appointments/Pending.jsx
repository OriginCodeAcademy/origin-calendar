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
    console.log(this.state.pending);
    const id = event.currentTarget.getAttribute('id');
    const studentEmail = event.currentTarget.getAttribute('email');
    const instructorEmail = "kaiyawalker87@gmail.com"
    const time = event.currentTarget.getAttribute('time');
    const studentName = event.currentTarget.getAttribute('studentName');
     console.log(studentEmail)
     console.log(time)
     console.log(studentName)

    //  axios.post('/api/AptRequests/removeApt', {
    //   "personalizations": [{
    //     "to": [{
    //       "email": "kaiyawalker87@gmail.com"
    //     },{
   //       "email": "eric.b.dodds@gmail.com"
    //     }]
    //   }]
    // })
    
    //   email: "kaiyawalker87@gmail.com",
    //   time: time,
    //   studentName: "Kaiya Walker"
    // })
   
    axios.post('/api/AptRequests/removeApt', {
      email: studentEmail,
      time: time,
      studentName: studentName
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error,"error");
      });

      axios.post('/api/AptRequests/removeApt', {
        email: instructorEmail,
        time: time,
        studentName: studentName
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
              
            </tr>
            
          </thead>
          <tbody className='table-striped'>

            {this.state.pending.map((e) => {
              return (
                <tr>
                  <td>{e.topicSummary}</td>
                  <td>{e.issueDescription}</td>
                  <td>{moment(e.time).format('L')}</td>
                  <td>{moment(e.time).format('hh:mm a')}</td>
                  <td>
                  <button className="btn btn-info" email={e.email} studentName={e.studentName} id={e.id} time={e.time} onClick={this.handleRemoveApt}>Remove</button>
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
