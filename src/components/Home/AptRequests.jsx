import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment'

class AptRequests extends Component {
  constructor(props) {
    super(props)
    this.state = {
      requests: []
    }
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    if (!this.props.userId) return;
    const currentDate = new Date();
    const currentDateIsoFormat = currentDate.toISOString();
    axios.get(`/api/AptRequests?filter[where][time][gt]=` + currentDateIsoFormat)
      .then((response) => {
        console.log(response.data)
        this.setState({
          requests: response.data
        })
        console.log(this.state.requests)
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
    return (
      <div>
        <h2>Appointment Requests</h2>
        {this.state.requests ? <table className='table'>
          <thead>
            <tr>
              {/* <th>Name</th> */}
              <th className="col-3">Summary</th>
              <th className="col-5">Description</th>
              <th className='col-1'>Date</th>
              <th className='col-1'>Time</th>
              <th className='col-1'>Approve</th>
              <th className='col-1'>Deny</th>
            </tr>
          </thead>
          <tbody className='table-striped'>
            {this.state.requests.map((e) => {
              return (
                <tr>
                  <td className='col-3'>{e.topicSummary}</td>
                  <td className='col-5'>{e.topicSummary} - {e.issueDescription}</td>
                  <td className='col-1'>{moment(e.time).format('L')}</td>
                  <td className='col-1'>{moment(e.time).format('hh:MM a')}</td>
                  <td className='col-1'><button type='button' className='btn btn-success'>Approve</button></td>
                  <td className='col-1'><button id={e.id} type='button' className='btn btn-danger' onClick={this.handleDelete}>Deny</button></td>
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
