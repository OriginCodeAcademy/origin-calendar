import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment-timezone';

class Availability extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: 'Anthony',
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
                                <option value="Athony">Anthony</option>
                                <option value="Christian">Christian</option>
                                <option value="Michael">Michael</option>
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
                        <div style={{ overflowY: 'auto', maxHeight: '500px' }}>
                            <div>
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Date</th>
                                            <th>Time</th>
                                            <th></th>
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
                                                        <td><button className='btn btn-danger' id={e.id} onClick={this.handleDelete}>X</button></td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
export default Availability;
