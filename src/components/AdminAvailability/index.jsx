import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

class Availability extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: 'Instructor A',
            dateTime: '',
            adminAvailSlots: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
            .then(res => this.setState({ adminAvailSlots: res.data})
        )
        }
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
                                <option value="Instructor A">Instructor A</option>
                                <option value="Instructor B">Instructor B</option>
                                <option value="Instructor C">Instructor C</option>
                            </select>
                        </div>

                        <br />

                        <div className="control">
                            <label for="appt-time">Date, Time</label>
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
                                                  <td>{moment(e.timeSlot).format('L')}</td>
                                                  <td>{moment(e.timeSlot).format('hh:mm a')}</td>
                                              </tr>
                                          )
                                      })
                                  }
                              </tbody>
                          </table>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
export default Availability;
