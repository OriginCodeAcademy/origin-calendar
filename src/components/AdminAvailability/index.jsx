import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment-timezone';

class Availability extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: '',
            dateTime: '',
            adminAvailSlots: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        if (!this.state.dateTime) {
            alert('Error: Please pick a date and time!')
        } else {

            event.preventDefault();

            axios.post(`/api/Slots`, {
                "instructorId": this.state.admin,
                "timeSlot": this.state.dateTime,
                "duration": 30
            }).then((response) => {
            }).catch((error) => {
                console.log(error)
            })
            const currentDate = new Date();
            const currentDateIsoFormat = currentDate.toISOString();
            axios.get(`/api/Slots?filter[where][timeSlot][gt]=` + currentDateIsoFormat)
                .then(res => this.setState({ adminAvailSlots: res.data })
            )
        }
    }

    handleDelete(event) {
        let adminAvailSlots = this.state.adminAvailSlots
        let slot = adminAvailSlots.findIndex(slot => slot.id == event.target.id);

        axios.get(`/api/Slots/${adminAvailSlots[slot].id}/aptRequests`)
        .then(res => {
            res.data.map(request => {
                axios.delete(`/api/AptRequests/${request.id}`)
                axios.post(`/api/AptRequests/denyEmail`, {
                    email: request.email,
                    time: request.time,
                })
            })
        })
        .catch(response => console.log(response))
        axios.delete(`/api/Slots/${event.target.id}`)
        adminAvailSlots.splice(slot, 1);

        this.setState({
            adminAvailSlots: adminAvailSlots,
        })
    }

    componentDidMount() {
        const currentDate = new Date();
        const currentDateIsoFormat = currentDate.toISOString();
        axios.get(`/api/Slots?filter[where][timeSlot][gt]=` + currentDateIsoFormat)
            .then(res => this.setState({ adminAvailSlots: res.data })
            )
    }

    render() {
        return (
            <div className="row">
                <div className='col-md-6' >
                    <h2 >Schedule your Availability</h2>

                    <form className="form" >
                        <label>Name</label>
                        <div>
                            <select
                                className="form-control"
                                value={this.state.admin}
                                onChange={this.handleChange}
                                name="admin"
                            >
                                <option value="anthony">Anthony</option>
                                <option value="christian">Christian</option>
                                <option value="michael">Michael</option>
                            </select>
                        </div>

                        <br />

                        <div className="control">
                            <label htmlFor="appt-time">Date, Time</label>
                            <input
                                type="datetime-local"
                                id="avail-date"
                                name="dateTime"
                                value={this.state.dateTime}
                                onChange={this.handleChange}
                                required />
                        </div>

                        <br />
                        <button className="btn btn-info" onClick={this.handleSubmit}>Submit</button>
                    </form>
                </div>
                <div className='col-md-6' >
                    <form>
                        <h2 >Here is Your Availability</h2>
<<<<<<< HEAD
                        <div style={{overflowY: 'auto', maxHeight: '500px'}}>
                          <table className='table'>
                              <thead>
                                  <tr>
                                      <th>Name</th>
                                      <th>Date</th>
                                      <th>Time</th>
                                  </tr>
                              </thead>
                              <tbody className='table-striped'>
                                  {
                                      this.state.adminAvailSlots.map((e) => {
                                          return (
                                              <tr>
                                                  <td>{e.instructorId}</td>
                                                  <td>{moment.utc(e.timeSlot).tz('America/Los_Angeles').format('L')}</td>
                                                  <td>{moment.utc(e.timeSlot).tz('America/Los_Angeles').format('hh:mm a')}</td>
                                                  <td><button id={e.id} onClick={this.handleDelete}type='button' className='btn btn-danger'>Delete</button></td>
                                              </tr>
                                          )
                                      })
                                  }
                              </tbody>
                          </table>
=======
                        <div style={{ overflowY: 'auto', maxHeight: '500px' }}>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                    </tr>
                                </thead>
                                <tbody className='table-striped'>

                                    {
                                        this.state.adminAvailSlots.map((e) => {
                                            return (
                                                <tr className='availRow' key={e.id}>
                                                    <td>{e.instructorId}</td>
                                                    <td>{moment(e.timeSlot).format('L')}</td>
                                                    <td>{moment(e.timeSlot).format('hh:mm a')}</td>
                                                    <td><button className='btn btn-danger' id={e.id} onClick={this.handleDelete}>Delete</button></td>
                                                    <td><svg className='trash' id={e.id} onClick={this.handleDelete} version="1.1" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 32 32"><title>bin</title><path d="M4 10v20c0 1.1 0.9 2 2 2h18c1.1 0 2-0.9 2-2v-20h-22zM10 28h-2v-14h2v14zM14 28h-2v-14h2v14zM18 28h-2v-14h2v14zM22 28h-2v-14h2v14z"></path><path d="M26.5 4h-6.5v-2.5c0-0.825-0.675-1.5-1.5-1.5h-7c-0.825 0-1.5 0.675-1.5 1.5v2.5h-6.5c-0.825 0-1.5 0.675-1.5 1.5v2.5h26v-2.5c0-0.825-0.675-1.5-1.5-1.5zM18 4h-6v-1.975h6v1.975z"></path></svg></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
>>>>>>> Fixes delete button
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
export default Availability;
