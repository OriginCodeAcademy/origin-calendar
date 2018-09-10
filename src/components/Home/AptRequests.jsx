import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment'

class AptRequests extends Component {
  constructor(props) {
    super(props)
    this.state = {
      requests: []
    }
<<<<<<< HEAD
<<<<<<< HEAD
    this.handleDelete = this.handleDelete.bind(this);
=======
>>>>>>> aptrequests file
=======
    this.handleDelete = this.handleDelete.bind(this);
>>>>>>> rebase
  }

  componentDidMount() {
    if (!this.props.userId) return;
    const currentDate = new Date();
    const currentDateIsoFormat = currentDate.toISOString();
    axios.get(`/api/AptRequests?filter[where][time][gt]=` + currentDateIsoFormat)
      .then((response) => {
<<<<<<< HEAD
<<<<<<< HEAD
        this.setState({
          requests: response.data
        })
=======
=======
>>>>>>> aptrequests file
        console.log(response.data)
        this.setState({
          requests: response.data
        })
        console.log(this.state.requests)
<<<<<<< HEAD
>>>>>>> aptrequests file
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
=======
>>>>>>> aptrequests file
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

  render() {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
    console.log(this.state.requests)
>>>>>>> aptrequests file
=======
>>>>>>> rebase
=======
    console.log(this.state.requests)
>>>>>>> aptrequests file
=======
>>>>>>> rebase
    return (
      <div>
        <h2>Appointment Requests</h2>
        {this.state.requests ? <table className='table'>
          <thead>
            <tr>
<<<<<<< HEAD
<<<<<<< HEAD
              <th>Name</th>
=======
              {/* <th>Name</th> */}
<<<<<<< HEAD
<<<<<<< HEAD
              <th>Summary</th>
>>>>>>> aptrequests file
=======
              {/* <th>Name</th> */}
              <th>Summary</th>
>>>>>>> aptrequests file
              <th>Description</th>
              <th>Date</th>
              <th>Time</th>
              <th>Approve</th>
              <th>Deny</th>
<<<<<<< HEAD
=======
=======
>>>>>>> rebase
              <th className="col-3">Summary</th>
              <th className="col-5">Description</th>
              <th className='col-1'>Date</th>
              <th className='col-1'>Time</th>
              <th className='col-1'>Approve</th>
              <th className='col-1'>Deny</th>
<<<<<<< HEAD
>>>>>>> rebase
=======
>>>>>>> aptrequests file
=======
>>>>>>> rebase
            </tr>
          </thead>
          <tbody className='table-striped'>
            {this.state.requests.map((e) => {
              return (
                <tr>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
                  <td>{e.studentName}</td>
                  <td><strong>{e.topicSummary}</strong> - {e.issueDescription}</td>
                  <td>{moment(e.time).format('L')}</td>
                  <td>{moment(e.time).format('hh:MM a')}</td>
                  <td><button type='button' className='btn btn-success'>Approve</button></td>
                  <td><button id={e.id} type='button' className='btn btn-danger' onClick={this.handleDelete}>Deny</button></td>
=======
=======
>>>>>>> aptrequests file
                  <td>{e.topicSummary}</td>
                  <td>{e.issueDescription}</td>
                  <td>{moment(e.time).format('L')}</td>
                  <td>{moment(e.time).format('hh:MM a')}</td>
                  <td><button type='button' className='btn btn-success'>Approve</button></td>
                  <td><button type='button' className='btn btn-danger'>Deny</button></td>
<<<<<<< HEAD
>>>>>>> aptrequests file
=======
=======
>>>>>>> rebase
                  <td className='col-3'>{e.topicSummary}</td>
                  <td className='col-5'>{e.topicSummary} - {e.issueDescription}</td>
                  <td className='col-1'>{moment(e.time).format('L')}</td>
                  <td className='col-1'>{moment(e.time).format('hh:MM a')}</td>
                  <td className='col-1'><button type='button' className='btn btn-success'>Approve</button></td>
                  <td className='col-1'><button id={e.id} type='button' className='btn btn-danger' onClick={this.handleDelete}>Deny</button></td>
<<<<<<< HEAD
>>>>>>> rebase
=======
>>>>>>> aptrequests file
=======
>>>>>>> rebase
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
