import React, { Component } from 'react';

const Row = (props) => {
  const { appointment } = props;
  //const appointment = this.props.appointment;
  return (
    <tr>
      <td>{appointment.studentName}</td>
      <td>{appointment.timeSlot}</td>
      <td>{appointment.timeSlot}</td>
      <td>{appointment.duration}</td>
    </tr>
  )}

class Listing extends Component {
constructor() {
  super();
  this.state = {};
}

componentDidMount() {
//Pretend we are fetching data.
console.log('message did componentDidMount.')
this.setState({
  appointments: [
    {
      timeSlot:'Thursday June 25 4:00pm',
      studentName:"Alex Martinez",
      duration:'1hr',
    },
    {
      timeSlot:'Thursday June 25 4:00pm',
      studentName:"Jake Espino",
      duration:'1hr',
    }
  ]
})
}
render() {
if(!this.state.appointments) return null;
  return (
    <table className='table'>
      <thead className='thead-dark'>
        <tr>
          <th>Name</th>
          <th>Date</th>
          <th>Time</th>
          <th>Duration</th>
        </tr>
      </thead>
      <tbody className='table-striped'>
        <tr>
          <td>{this.state.appointments[0].studentName}</td>
          <td>Thurs, June 20</td>
          <td>3:00 PM</td>
          <td>1 hr</td>
        </tr>
        <Row appointment={this.state.appointments[0]}/>
      </tbody>
    </table>
  );
}

}
export default Listing;
