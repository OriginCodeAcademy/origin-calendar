import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment'

class PendingAppointments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pending: []
    }
  }

  componentDidMount() {
    if (!this.props.userId) return;
    axios.get(`/api/Visitors/${this.props.userId}/aptRequests`)
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
                  <td>{moment(e.time).format('hh:MM a')}</td>
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
