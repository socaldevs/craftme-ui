import React, { Component } from "react";
import BigCalendar from 'react-big-calendar'
import moment from 'moment';
import { 
  fetchTeacherAvailability, 
  submitBookingToServer, 
  submitAvailabilityToServer,
  fetchUserUpcomingBookings,
} from './../apiCaller.js';
import 'react-big-calendar/lib/css/react-big-calendar.css';


BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      teacher_id: 0,
      student_id: 0,
      events: [],
      events: [],
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
    this.getTeacherAppointments = this.getTeacherAppointments.bind(this);
    this.getTeacherAvailability = this.getTeacherAvailability.bind(this);      
  }


  async submitAvailability() {
    // Teachers are directed to search to add a craft on login
    // after they add it they're directed to calendar submit availability
  



    // submit availability is a feature only teachers can use
    // so it assumes that the logged in usertype is teacher and
    // it grabs the currentId as the teacher id 
    const { start, end } = this.state;
    const { currentId } = this.props.currentId;
    // this is used when the redirection to calendar from teacher account
    // is implemented
    // const { currentId } = this.props.history.location.state;
  
    try {
      console.log('what follows is harded coded ( teacher_id: 1 )');           
      const availabilityToSend  = {
        teacher_id: 1,
        start,
        end
      };
      const availability  = await submitAvailabilityToServer(availabilityToSend);        
      //datefying the string date
      availability.title = 'Open';
      availability.start = new Date(availability.start);
      availability.end = new Date(availability.end);
      // updating the events on the calendar
      await this.setState({ events: [...this.state.events, availability]});
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
        student_id: student.currentId,
        // student_id: 5,
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
      
      const updatedAvailabilities = this.state.events.filter((availability) => {
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
      await this.setState({events: updatedAvailabilities});
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
        // if the user is a teacher        
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

  // for student user
  // as a student the user is going to be directed to this page from
  // the search results page so the next line receives the student (current user) id
  // and the teacher he's interested in from the state that was passed from the
  // the search results page
  async getTeacherAvailability(studentId, teacher) {
    try {

      await this.setState({
        student_id: studentId,
        teacher_id: teacher.id
      });

      let availabilities = await fetchTeacherAvailability(this.state.teacher_id);
      //datefying the string dates
      availabilities = availabilities.map((availability) => {
        availability.title = 'Open';
        availability.taken = false;
        availability.start = new Date(availability.start);
        availability.end = new Date(availability.end);
        return availability;
      });
      await this.setState({events: [...this.state.events, ...availabilities]});
      console.log('just finished excuting teacher availability and the state is', this.state.events);
    } catch (error) {
      console.error('error while trying to set the state from server availabilities', error);
    }
  }

  // Teacher feature
  // getting the appointments aleardy set for this teacher
  // assuming that the logged in usertype is teacher and
  // and the currentId in this case is a teacher id 
  async getTeacherAppointments(studentId, teacher) {
    // const { currentId } = this.props;
    // map their titles to be like Craft with Student and proper date
    // add them to the events array
    try {
      // get bookings from bookings table for the logged in teacher
      console.log('hard coded input at fetchUserUpcomingBookings');
      let appointments = await fetchUserUpcomingBookings(1);

      console.log(appointments[0]);
      // console.log(appointments[1]);
      // console.log(appointments[2]);          
      appointments = appointments.map((appointment) => {
        // appointment.title = 'Taken';
        appointment.taken = true;
        appointment.start = new Date(appointment.start);
        appointment.end = new Date(appointment.end);
        return appointment;
      });
      console.log('state before setting ==>', this.state.events);
      await this.setState({ events: [...this.state.events, ...appointments] });  
      console.log('state ==>', this.state.events);
    } catch (error) {
      console.error('error while trying to get appointments from server', error);
    }
  }

  eventStyleGetter (event, start, end, isSelected) {
    console.log('event ====>', event);
    let backgroundColor;
    if(event.taken){
      backgroundColor = '#d9534f';
    } else {
      backgroundColor = '#5cb85c';
    }

    const style = {
        // backgroundColor: backgroundColor,
        backgroundColor,        
        // borderRadius: '0px',
        // opacity: 0.8,
        // color: 'black',
        // border: '0px',
        // display: 'block'
    };
    return { style };
  }


  componentDidMount(){
    const { studentId, teacher } = this.props.history.location.state;
  
    // for student user
    this.getTeacherAvailability(studentId, teacher);

    // if user type is not student (it's teacher)
    if(this.state.userType !== 's'){
      this.getTeacherAppointments(studentId, teacher);
    }
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
          events={ this.state.events }
          defaultView="week"
          scrollToTime={ new Date(1970, 1, 1, 6) }
          defaultDate={ new Date() }
          onSelectEvent={ this.timeSlotSelected }
          onSelectSlot={ this.timeSlotSelected }
          eventPropGetter={ this.eventStyleGetter }
          />
      </React.Fragment>
    );
  }    
}
  


