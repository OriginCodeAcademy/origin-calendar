import React, {Component} from 'react';
import axios from 'axios';
import moment from 'moment';


class RequestForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      topic: '',
      description: '',
      time: null,
      slots: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  handleChange(e) {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();

    axios.post('/api/Visitors/5b3b9e6b869aeb813d095ca1/aptRequests',   {
      "topicSummary": this.state.topic,
      "issueDescription": this.state.description,
      "time": this.state.time
    }).then((response) => {
      this.setState({
        alert: 'Awesome possum! Your appointment has been requested.',
        error: false
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
            <select className='form-control' onChange={this.handleChange} value={this.state.time} name='time'>
              <option value=''>--- Select a Time Slot ---</option>
              {this.state.slots.map(slot =>
                <option value={slot.timeSlot}>{ moment(slot.timeSlot).format("dddd, MMMM Do, h:mm a") }</option>
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
