import React, {Component} from 'react';
import axios from 'axios';
import moment from 'moment';
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom';


class RequestForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      topic: '',
      description: '',
      time: '',
      instructorId:'',
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
        selectedSlot: this.state.slots[index],
        instructorId: this.state.slots[index].instructorId
      })
      console.log(this.state.slots);
      console.log(this.state.slots[index].instructorId);
  }


  handleSubmit(e) {
    axios.post(`/api/Visitors/${this.props.user.id}/aptRequests`, {
      "topicSummary": this.state.topic,
      "studentName": this.props.user.firstName + ' ' + this.props.user.lastName,
      "email": this.props.user.email,
      "issueDescription": this.state.description,
      "time": this.state.time,
      "slotId": this.state.slotId,
      "instructorId": this.state.instructorId
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
        <h2>Choose an instructor you would like to schedule and appointment with.</h2>
        { this.state.alert && <div className={`alert alert-${this.state.error ? 'danger': 'success'}`}>{this.state.alert}</div>}
          <div className='form-group'>
 
  <div className="nav nav-tabs text-center" id="nav-tab" role="tablist">
    <Link to ='/christianviews' id='christian' className="nav-item nav-link" role="tab"aria-selected="true">Christian</Link>
    <Link to ='/anthonyviews' className="nav-item nav-link" role="tab" aria-selected="true">Anthony</Link>
    <Link to='/michaelviews' className="nav-item nav-link" role="tab" aria-selected="true">Michael</Link>
  </div>

            
      </div>
      </div>)
  }
}
export default RequestForm;
