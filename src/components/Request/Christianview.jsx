import react from 'react' ;
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

export default class Christianview extends react.Component{
    constructor(props){

        super(props);
        this.state = {
          topic: '',
          description: '',
          time: '',
          slots: [],
          slotId:'',
          selectedSlot:'',
          indexSelect:''

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTimeSlot = this.handleTimeSlot.bind(this);
        
      }
      handleChange(e) {
          console.log("EVENT");
        this.setState({
          [e.target.name] : e.target.value

        })
      }
  
      handleTimeSlot(e) {
    
       let index = e.target.selectedIndex - 1;
          this.setState({
            time: e.target.value,
            slotId: this.state.slots[index].id,
            selectedSlot: this.state.slots[index],
            indexSelect: index
        
            
          })
          
        
      }
    
      handleSubmit(e) {
          console.log('Handle Submit is working!');
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
        }).catch (err => {
          this.setState({
            alert: 'Sorry, something went wrong! Try again',
            error: true
          })
        })

        let selecturd = this.state.selectedSlot;
        let slotties = this.state.slots;

        for(var i =0; i < slotties.length; i++){
            if(slotties[i].id === selecturd.id){
              slotties.splice(i, 1);
            }
            
            
        } 
        
        console.log(slotties);
        
        
        this.setState({slots:slotties});

        
        
        
                 
      }
      componentDidMount() {
        const currentdate = new Date();
        const data = `/api/Slots?filter[where][and][0][timeSlot][gt]=${currentdate}
                      &filter[where][and][1][instructorId]=christian`;
        //axios.get(`/api/Slots?filter[where][timeSlot][gt]=` + currentDateIsoFormat)

        axios.get(data).then(response => this.setState({ slots: response.data }))
      }

      

    render(){
        const avail = this.state.slots;
        return( 
            <div className='form-fluid'>
                <div className='card'>
                    <div className='card-body'>
                        <div className='card-header text-center'>Christian</div>
                        { this.state.alert && <div className={`alert alert-${this.state.error ? 'danger': 'success'}`}>{this.state.alert}</div>}
                                 <label>Hello, what topic can Christian help you with?</label>
                                <input type='text' className='form-control' id='cform' onChange={this.handleChange} value={this.state.topic} name='topic'/>
                                
                                <div className='form-group'>
                                
                                <select className='form-control' onChange={this.handleTimeSlot} value={this.state.time}name='time' id='formtest'>
                                <option value=''>---Available Times ---</option>
                                {avail.map(slot=> 
                                    <option key={slot.id} value={slot.timeSlot} id='optionselect'> 
                                        { moment(slot.timeSlot).format("dddd, MMMM Do, h:mm a")} with Christian
                                    </option>)}
                                </select >
                                </div>
                                <div className='form-group'>
                                <label>Description</label>
                                <textarea rows='4' columns='50' className='form-control' id='cdesk'onChange={this.handleChange} value={this.state.description} name='description'></textarea>
                                </div>
                                <button className='btn btn-info' id='cbutton' onClick={this.handleSubmit}>Submit</button>
                                
                                <Link to="/request"><button className="btn btn-info" id='cancelbro'>Cancel</button></Link>
                                        
                                </div>       
                                 
                </div>
            </div>)
    }
}

                      