import React, {Component} from 'react';
import axios from 'axios';
import moment from 'moment';
import { Redirect } from 'react-router'


class RequestForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      topic: '',
      description: '',
      time: '',
      slots: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTimeSlot = this.handleTimeSlot.bind(this);

  }
  handleChange(e) {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  handleTimeSlot(e) {

    const index = e.target.selectedIndex - 1;
      this.setState({
        time: e.target.value,
        slotId: this.state.slots[index].id,
        selectedSlot: this.state.slots[index]
      })
  }

  handleSubmit(e) {
    axios.post(`/api/Visitors/${this.props.user.id}/aptRequests`, {
      "topicSummary": this.state.topic,
      "studentName": this.props.user.firstName + ' ' + this.props.user.lastName,
      "email": this.props.user.email,
      "issueDescription": this.state.description,
      "time": this.state.time,
      "slotId": this.state.slotId
    }).then((response) => {
      this.setState({
        alert: 'Awesome possum! Your appointment has been requested.',
        error: false,
        topic: '',
        description: '',
        time: ''
      })
    }).catch ((err) => {
      this.setState({
        alert: 'Sorry, something went wrong! Try again',
        error: true
      })
    })
  }
  componentDidMount() {
    axios.get('/api/Slots').then(response => this.setState({ slots: response.data }))
  }
  render() {
    return (
      <div className='form'>
        <h2>Request an Appointment</h2>
        { this.state.alert && <div className={`alert alert-${this.state.error ? 'danger': 'success'}`}>{this.state.alert}</div>}
          <div className='form-group'>
            <label>Topic</label>
            <input type='text' className='form-control' onChange={this.handleChange} value={this.state.topic} name='topic'/>
          </div>
          <div className='form-group'>
            <label>Time</label>
            <select className='form-control' onChange={this.handleTimeSlot} value={this.state.time} name='time'>
              <option value=''>--- Select a Time Slot ---</option>
              {this.state.slots.map(slot =>
                <option key={slot.id} value={slot.timeSlot}>{ moment(slot.timeSlot).format("dddd, MMMM Do, h:mm a") } with {slot.instructorId}</option>
              )}
            </select >
          </div>
          <div className='form-group'>
            <label>Description</label>
            <textarea rows='4' columns='50' className='form-control' onChange={this.handleChange} value={this.state.description} name='description'></textarea>
          </div>
          <button className='btn btn-info' onClick={this.handleSubmit}>Submit</button>
      </div>)
  }
}
export default RequestForm;
