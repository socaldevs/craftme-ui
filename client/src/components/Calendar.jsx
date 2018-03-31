import React, { Component } from "react";
import BigCalendar from 'react-big-calendar'
import moment from 'moment';
import { fetchTeacherAvailability, submitBookingToServer, submitAvailabilityToServer } from './../apiCaller.js';
import 'react-big-calendar/lib/css/react-big-calendar.css';


BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      teacher_id: 0,
      student_id: 0,
      availabilities: [],
      start: '',
      end: '',
      selected_availability_id: 0,
      buttonStatus: true,
      userType: 's',    
    };

    this.submitBooking = this.submitBooking.bind(this);
    this.timeSlotSelected = this.timeSlotSelected.bind(this);
    this.submitAvailability = this.submitAvailability.bind(this);
    this.renderStudentElements = this.renderStudentElements.bind(this);
    this.renderTeacherElements = this.renderTeacherElements.bind(this);
  }


  async submitAvailability() {
    
    const { start, end } = this.state;
    
    try {
      conosle.log('what follows is harded coded');           
      const availabilityToSend  = {
        teacher_id: 1,
        start,
        end
      };
      const availability  = await submitAvailabilityToServer(availabilityToSend);        
      //datefying the string date
      availability.title = 'Other title';
      availability.start = new Date(availability.start);
      availability.end = new Date(availability.end);
      // updating the availabilities on the calendar
      await this.setState({ availabilities: [...this.state.availabilities, availability]});
    } catch (error) {
      console.error('error while trying to submit availability', error);
    }  
  }

  async submitBooking() {

    const { start, end, selected_availability_id } = this.state;
    const { teacher, student, matchedCraft } = this.props.history.location.state;
    console.log('teacher', teacher, 'student', student, 'matched', matchedCraft);
    const title = `${matchedCraft.name} | Teacher: ${teacher.username} | Student: ${student.currentUser}`;
    try {
      const bookingToSend  = {
        // student_id: student.currentId,
        student_id: 5,
        teacher_id: teacher.id,
        title,
        start,
        end,
        selected_availability_id
      };
      
      // TO DO: create a confirmation modal popup to and fill it with the booking
      let booking = await submitBookingToServer(bookingToSend);        
      //datefying the string date
      booking.title = title;
      booking.start = new Date(booking.start);
      booking.end = new Date(booking.end);
      
      const updatedAvailabilities = this.state.availabilities.filter((availability) => {
        // getting rid of the booked slot
        if(availability.id === bookingToSend.selected_availability_id){
          return false;
        } else {
          return true;  
        }
        // if(String(availability.start) === String(booking.start) && 
        // String(availability.end) === String(booking.end)){
        //   return false;
        // } else {
        //   return true;
        // }
      });
      await this.setState({availabilities: updatedAvailabilities});
      // redirect to lessons after a successful booking
      this.props.history.push('/lessons');
    } catch (error) {
      console.error('error while trying to submit booking', error);
    }
  }

  async timeSlotSelected(timeslot){
    //TODO: check if the range hits an occupied slot
    // Check if the slot has a teacher_id ( it has an availability record)
    if(timeslot.hasOwnProperty('teacher_id')){
      if(this.state.userType === 's') {
        // if the user is a student
        console.log('this is available, timeslot: ', timeslot );
        const { start, end, id } = timeslot;
        await this.setState({start, end, buttonStatus:false, selected_availability_id: id});          
      } else {
        // if the user is a teacher
        await this.setState({ buttonStatus:true });
        console.log('You have an appointment at this time');   
      }

    } else if (timeslot.hasOwnProperty('slots')) {
      // if the user is a student
      if(this.state.userType === 's'){
        await this.setState({ buttonStatus:true });
        console.log('this is unavailable');  
      } else {
        console.log('this is available, timeslot: ', timeslot );
        const { start, end } = timeslot;
        await this.setState({ start, end, buttonStatus:false });          
      }
      //maybe show an error message saying you cant book this because its taken  
    }
    
  }

  renderStudentElements(){
    return (
      <div>
        <h3 className="callout">
          To book appointment:
        </h3>
        <p>Click on the availability spot to select.</p>
        <p>Selected timeslot: from {String(this.state.start)} to {String(this.state.end)}</p>
        <button type="button" onClick={this.submitBooking} 
          disabled={this.state.buttonStatus} >Book appointment
        </button>
      </div>  
    );
  }

  renderTeacherElements() {
    return (
      <div>
        <h3 className="callout">
          To allocate availability:
        </h3>
        <p>Drag the mouse over the calendar to select a time range.</p>
        <p>Selected timeslot: from {String(this.state.start)} to {String(this.state.end)}</p>
        <button type="button" onClick={this.submitAvailability} 
          disabled={this.state.buttonStatus} >Submit
        </button>
      </div>  
    );
  }
  componentDidMount(){
    const { studentId, teacher } = this.props.history.location.state;
  
    const getBookings = async () => {
      try {

        await this.setState({
          student_id: studentId,
          teacher_id: teacher.id
        });

        let availabilities = await fetchTeacherAvailability(this.state.teacher_id);
        //datefying the string dates
        availabilities = availabilities.map((availability) => {
          availability.title = 'Open';
          availability.start = new Date(availability.start);
          availability.end = new Date(availability.end);
          return availability;
        });
        await  this.setState({availabilities});
      } catch (error) {
        console.error('error while trying to set the state from server availabilities', error);
      }
    };
    
    getBookings();    
  }

  render(){
    return (
      <React.Fragment>

        {
          this.state.userType === 's' ? 
            this.renderStudentElements():
            this.renderTeacherElements()
        }
        <BigCalendar
          style={ {minHeight: '100vh'} }
          selectable
          formats={{
            // dateFormat:'mm dd yyyy',
            dayFormat: (date, culture, localizer) =>
            localizer.format(date, 'dd MM/DD', culture),
        
          }}
          events={ this.state.availabilities }
          defaultView="week"
          scrollToTime={ new Date(1970, 1, 1, 6) }
          defaultDate={ new Date() }
          onSelectEvent={ this.timeSlotSelected }
          onSelectSlot={ this.timeSlotSelected }
          />
      </React.Fragment>
    );
  }    
}
  


