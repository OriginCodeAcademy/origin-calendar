import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment'

class AptRequests extends Component {
  constructor(props) {
    super(props)
    this.state = {
      requests: []
    }
  }

  componentDidMount() {
    if (!this.props.userId) return;
    const currentDate = new Date();
    const currentDateIsoFormat = currentDate.toISOString();
    axios.get(`/api/AptRequests?filter[where][time][gt]=` + currentDateIsoFormat)
      .then((response) => {
<<<<<<< HEAD
        this.setState({
          requests: response.data
        })
=======
        console.log(response.data)
        this.setState({
          requests: response.data
        })
        console.log(this.state.requests)
>>>>>>> aptrequests file
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
<<<<<<< HEAD
=======
    console.log(this.state.requests)
>>>>>>> aptrequests file
    return (
      <div>
        <h2>Appointment Requests</h2>
        {this.state.requests ? <table className='table'>
          <thead>
            <tr>
<<<<<<< HEAD
              <th>Name</th>
=======
              {/* <th>Name</th> */}
              <th>Summary</th>
>>>>>>> aptrequests file
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
<<<<<<< HEAD
                  <td>{e.studentName}</td>
                  <td><strong>{e.topicSummary}</strong> - {e.issueDescription}</td>
                  <td>{moment(e.time).format('L')}</td>
                  <td>{moment(e.time).format('hh:MM a')}</td>
                  <td><button type='button' className='btn btn-success'>Approve</button></td>
                  <td><button id={e.id} type='button' className='btn btn-danger' onClick={this.handleDelete}>Deny</button></td>
=======
                  <td>{e.topicSummary}</td>
                  <td>{e.issueDescription}</td>
                  <td>{moment(e.time).format('L')}</td>
                  <td>{moment(e.time).format('hh:MM a')}</td>
                  <td><button type='button' className='btn btn-success'>Approve</button></td>
                  <td><button type='button' className='btn btn-danger'>Deny</button></td>
>>>>>>> aptrequests file
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
