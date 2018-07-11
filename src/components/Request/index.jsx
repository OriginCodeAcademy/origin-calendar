import React, {Component} from 'react';
import axios from 'axios';


class RequestForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      topic: '',
      description: '',
      time: ''
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
      "times": [
        "2018-07-10T23:18:44.668Z"
      ]
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
            <input type='text' className='form-control' onChange={this.handleChange} value={this.state.time} name='time'/>
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
