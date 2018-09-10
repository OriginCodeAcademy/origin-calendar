import React, { Component } from 'react';
import axios from 'axios';

class Availability extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'Admin 1',
            dateTime: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    handleChange2(event) {
        this.setState({ dateTime: event.target.value });
    }
    handleSubmit(event) {
        if (!this.state.dateTime) {
            alert('Error: Please pick a date and time!')
        } else {
            alert('Thank you ' + this.state.value + ' for scheduling an appointment at ' +
                this.state.dateTime);
        }
        event.preventDefault();

        axios.post(`/api/DateTimes`, {
            "adminName": this.state.value,
            "timeSlot": this.state.dateTime
        }).then((response) => {
        }).catch((err) => {
            console.log(error)
        })
    }
    render() {
        return (
            <div className="row">
                <div className='form col-md-6' >
                    <h2 >Schedule your Availability</h2>

                    <form className="form-group" >
                        <label> Name</label>
                        <div>
                            <select
                                className="form-control"
                                value={this.state.value}
                                onChange={this.handleChange}
                            >
                                <option value="Admin 1">Admin 1</option>
                                <option value="Admin 2">Admin 2</option>
                                <option value="Admin 3">Admin 3</option>
                            </select>
                        </div>

                        <br />

                        <div className="control">
                            <label for="appt-time">Date/time: </label>
                            <input
                                type="datetime-local"
                                id="avail-date"
                                name="avail-date"
                                value={this.state.dateTime}
                                onChange={this.handleChange2}
                                required />
                        </div>

                        <br />
                        <button onClick={this.handleSubmit}>Submit</button>
                    </form>
                </div>

                <div className='col-md-6' >
                    <form>
                        <h2 >Here is Your Availability</h2>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                </tr>
                            </thead>
                            <tbody className='table-striped'>

                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        )
    }
}
export default Availability;