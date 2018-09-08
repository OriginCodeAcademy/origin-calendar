import React, {Component} from 'react';
import axios from 'axios';

class Availability extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };

        this.myFunction= this.myFunction.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
     
    myFunction() {
        alert("Thank you for your submissions");
    }

    handleChange(event) {
        this.setState({value: event.target.value});
      }

    handleSubmit(event) {
        alert('Thank you ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <div className='form' >
                <h2 >Schedule your week</h2>

                <form className="form-group" >
                    <label>Admin Name</label>
                    <select className="form-control" value={this.state.value} onChange={this.handleChange}>
                        <option value="admin 1">Admin 1</option>
                        <option value="admin 2">Admin 2</option>
                        <option value="admin 3">Admin 3</option>
                    </select>
                    
                </form>

                <br />

                <table >
                    <tr>
                        <th>Time</th>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                    </tr>

                    <tr>
                        <td >8:00 am</td>
                        <td ><input type="checkbox" value=" 8:00 Monday "/></td>
                        <td ><input type="checkbox" /></td>
                        <td ><input type="checkbox" /></td>
                        <td ><input type="checkbox" /></td>
                        <td ><input type="checkbox" /></td>
                    </tr>

                    <tr>
                        <td >8:30 am</td>
                        <td ><input type="checkbox" value=" 8:30 Monday"/></td>
                        <td ><input type="checkbox" /></td>
                        <td ><input type="checkbox" /></td>
                        <td ><input type="checkbox" /></td>
                        <td ><input type="checkbox" /></td>
                    </tr>

                    <tr>
                        <td >6:00 pm</td>
                        <td ><input type="checkbox" value=" 6:00 Monday"/></td>
                        <td ><input type="checkbox" /></td>
                        <td ><input type="checkbox" /></td>
                        <td ><input type="checkbox" /></td>
                        <td ><input type="checkbox" /></td>
                    </tr>

                    <tr>
                        <td >6:30 pm</td>
                        <td ><input type="checkbox" value=" 6:30 Monday"/></td>
                        <td ><input type="checkbox" /></td>
                        <td ><input type="checkbox" /></td>
                        <td ><input type="checkbox" /></td>
                        <td ><input type="checkbox" /></td>
                    </tr>


                </table>
                <br />
             
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        )
    }
}
export default Availability;