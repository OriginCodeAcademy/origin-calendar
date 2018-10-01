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
    const instructorId = event.currentTarget.getAttribute('instructorId');
    const time = event.currentTarget.getAttribute('time');
    const studentName = event.currentTarget.getAttribute('studentName');
  
   
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
        instructorId: instructorId,
        email: `${instructorId}@origincodeacademy.com`,
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
              <th></th>

              
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
                  {/* <button class="btn btn-danger" instructorId={e.instructorId} email={e.email} studentName={e.studentName} id={e.id} time={e.time} onClick={this.handleRemoveApt}>X</button> */}
                  <svg  className='trash'instructorId={e.instructorId} email={e.email} studentName={e.studentName} id={e.id} time={e.time} onClick={this.handleRemoveApt} version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><title>bin</title><path d="M4 10v20c0 1.1 0.9 2 2 2h18c1.1 0 2-0.9 2-2v-20h-22zM10 28h-2v-14h2v14zM14 28h-2v-14h2v14zM18 28h-2v-14h2v14zM22 28h-2v-14h2v14z"></path><path d="M26.5 4h-6.5v-2.5c0-0.825-0.675-1.5-1.5-1.5h-7c-0.825 0-1.5 0.675-1.5 1.5v2.5h-6.5c-0.825 0-1.5 0.675-1.5 1.5v2.5h26v-2.5c0-0.825-0.675-1.5-1.5-1.5zM18 4h-6v-1.975h6v1.975z"></path></svg>
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
