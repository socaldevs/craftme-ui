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

// helper
const doesOverlap = (calendarEvents, event) => {
  const eventStart = new moment(event.start);
  const eventEnd = new moment(event.end);
  let overlaps;
  
  overlaps = calendarEvents.findIndex((cEvent) => {
    const cEventStart = new moment(cEvent.start);
    const cEventEnd = new moment(cEvent.end);
    // First case: if the start of the selected slot is in between the
    // beginning the and the end of the calendar event
    // Second case: if the end of the selected slot is in between the
    // beginning the and the end of the calendar event

    if(cEventStart.isBetween(eventStart, eventEnd) ||
      cEventEnd.isBetween(eventStart, eventEnd) ||
      eventStart.isBetween(cEventStart, cEventEnd) || 
      eventEnd.isBetween(cEventStart, cEventEnd) ||
      eventStart.isSame(cEventStart) || 
      eventStart.isBefore(new moment())
    ){
      return true;
    } else {
      return false;  
    }
  })

  return overlaps === -1 ? false : true;
};

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
<<<<<<< HEAD
      currentUserId: 0, // either a student or a teacher 
      events: [],
      start: false,
      end: false,
      selected_availability_id: 0,
      buttonStatus: true,
      userType: 1,    
=======
      teacher_id: 0,
      student_id: 0,
      events: [],
      start: '',
      end: '',
      selected_availability_id: 0,
      buttonStatus: true,
      userType: null,    
>>>>>>> [Messages] - Updates messages live
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
  


    // look for me
    // submit availability is a feature only teachers can use
    // so it assumes that the logged in usertype is teacher and
    // it grabs the currentId as the teacher id 
    const { start, end } = this.state;
    const { currentId } = this.props;
    // this is used when the redirection to calendar from teacher account
    // is implemented
    // const { currentId } = this.props.history.location.state;
  
    try {
      const availabilityToSend  = {
        teacher_id: currentId,
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
    // console.log('teacher', teacher, 'student', student, 'matched', matchedCraft);
    const title = `${matchedCraft.name} | Teacher: ${teacher.username} | Student: ${student.currentUser}`;
    try {
      const bookingToSend  = {
        student_id: student.currentId,
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

<<<<<<< HEAD
  async timeSlotSelected(timeslot){
=======
  async timeSlotSelected(timeslot) {
    //TODO: check if the range hits an occupied slot
    // Check if the slot has a teacher_id ( it has an availability record)
    if (timeslot.hasOwnProperty('teacher_id')) {
      if (this.state.userType === 1) {
        // if the user is a student
        console.log('this is available, timeslot: ', timeslot );
        const { start, end, id } = timeslot;
        await this.setState({start, end, buttonStatus:false, selected_availability_id: id});          
      } else {
        // if the user is a teacher
        await this.setState({ buttonStatus:true });
        console.log('You have an appointment at this time');   
      }
>>>>>>> [Messages] - Updates messages live

    const { userType } = this.state;

    // if the user is a teacher
    if(userType === 0) {
      // check if the action is drag
      // the drag action is to create availability for the teacher
      if(timeslot.hasOwnProperty('slots')){
        // check if the availability created overlaps with a different event
        if(!doesOverlap(this.state.events, timeslot)){
          // allow the teacher to submit the availability by enabling the submission button
          const { start, end } = timeslot;
          await this.setState({ start, end, buttonStatus:false });
        } else {
          // if theres an overlap display an error message
          console.log('Overlaping with event');
        }        
      } else { 
        await this.setState({ buttonStatus:true });        
        console.log('its an event');
      }
      // if the user is a student
<<<<<<< HEAD
    } else if(userType === 1) {
      // check if the event is clicked
      // events (availabilities) have a teacher id on them
      if(timeslot.hasOwnProperty('teacher_id')) {
        const { start, end, id } = timeslot;
        // enable the button and allow the student to book the availability
        await this.setState({start, end, buttonStatus:false, selected_availability_id: id}); 
=======
      if (this.state.userType === 1) {
        await this.setState({ buttonStatus:true });
        console.log('this is unavailable');  
>>>>>>> [Messages] - Updates messages live
      } else {
        // it's not an event (availability) so
        // disable the button
        await this.setState({ buttonStatus:true });
        console.log('its not available dude');
      }
    }  
  }

<<<<<<< HEAD
  renderStudentElements(){
    const options = { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit' };    
    const start = new Date(this.state.start).toLocaleTimeString('en-US', options);
    const end = new Date(this.state.end).toLocaleTimeString('en-US', options);

=======
  renderStudentElements() {
>>>>>>> [Messages] - Updates messages live
    return (
      <div>
        <h3 className="callout">
          To book appointment:
        </h3>
        <p>Click on the availability spot to select.</p>
        {this.state.start && <p>Selected timeslot: from {start} to {end}</p>}
        <button type="button" onClick={this.submitBooking} 
          disabled={this.state.buttonStatus} >Book appointment
        </button>
      </div>  
    );
  }

  renderTeacherElements() {

    const options = { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit' };    
    const start = new Date(this.state.start).toLocaleTimeString('en-US', options);
    const end = new Date(this.state.end).toLocaleTimeString('en-US', options);

    return (
      <div>
        <h3 className="callout">
          To allocate availability:
        </h3>
        <p>Drag the mouse over the calendar to select a time range.</p>
        {this.state.start && <p>Selected timeslot: from {start} to {end}</p>}
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
  async getTeacherAvailability(teacher) {
    try {
      let availabilities = await fetchTeacherAvailability(teacher.id);
      //datefying the string dates
      availabilities = availabilities.map((availability) => {
        availability.title = 'Open';
        availability.taken = false;
        availability.start = new Date(availability.start);
        availability.end = new Date(availability.end);
        return availability;
      });
      await this.setState({events: [...this.state.events, ...availabilities]});
      // console.log('just finished excuting teacher availability and the state is', this.state.events);
    } catch (error) {
      console.error('error while trying to set the state from server availabilities', error);
    }
  }

  // Teacher feature
  // getting the appointments aleardy set for this teacher
  // assuming that the logged in usertype is teacher and
  // and the currentId in this case is a teacher id 
  async getTeacherAppointments(teacher) {
    // const { currentId } = this.props;
    // map their titles to be like Craft with Student and proper date
    // add them to the events array
    try {
      // get bookings from bookings table for the logged in teacher
      // console.log('hard coded input at fetchUserUpcomingBookings');
      
      let appointments = await fetchUserUpcomingBookings(teacher.id);
          
      appointments = appointments.map((appointment) => {
        appointment.taken = true;
        appointment.start = new Date(appointment.start);
        appointment.end = new Date(appointment.end);
        return appointment;
      });
      await this.setState({ events: [...this.state.events, ...appointments] });  
    } catch (error) {
      console.error('error while trying to get appointments from server', error);
    }
  }

  eventStyleGetter (event) {
    // console.log('event ====>', event);
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


<<<<<<< HEAD
  async componentDidMount(){
    console.log('this is comp', this.props.currentId);
    const { teacher } = this.props.history.location.state || {teacher: {id: this.props.currentId}}; 
    
    this.getTeacherAvailability(teacher);
  
    // if user type is teacher get their appointments
    if(this.props.currentType === 0){
      this.getTeacherAppointments(teacher);
=======
  componentDidMount(){
    this.setState({
      userType: this.props.currentType
    })
    if (this.props.currentType === 1) {
      const { studentId, teacher } = this.props.history.location.state;
      
      // for student user
      this.getTeacherAvailability(studentId, teacher);
      
      // if user type is not student (it's teacher)
      if(this.state.userType !== 1){
        this.getTeacherAppointments(studentId, teacher);
      }
>>>>>>> [Messages] - Updates messages live
    }

    await this.setState({ userType: this.props.currentType });
    
  }

  render(){
    return (
      <React.Fragment>

        {
          this.state.userType === 1 ? 
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
  


