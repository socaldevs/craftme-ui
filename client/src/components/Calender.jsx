import React, { Component } from "react";
import BigCalendar from 'react-big-calendar'
import moment from 'moment';
import { fetchTeacherBookings, submitBookingToServer } from './../apiCaller.js';
import 'react-big-calendar/lib/css/react-big-calendar.css';


BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

export default class Calender extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      bookings: [],
      start: '',
      end: '',
      buttonStatus: true,    
    };

    this.submitBooking = this.submitBooking.bind(this);
    this.timeSlotSelected = this.timeSlotSelected.bind(this);
  }

  submitBooking() {
    
    const getSubmittedBooking = async () => {
      const { start, end } = this.state;
      // const { student_id, teacher_id } = this.props;
      try {
        // let booking = await submitBookingToServer(student_id, teacher_id, start, end);
        let booking = await submitBookingToServer(5, 1, start, end);        
        //datefying the string date
        booking.title = 'Teacher name and student name'
        booking.start = new Date(booking.start);
        booking.end = new Date(booking.end);
        this.setState({bookings: [...this.state.bookings, booking]});
        console.log('state after the booking submittion', this.state.bookings);
      } catch (error) {
        console.error('error while trying to submit booking', error);
      }
    };
    getSubmittedBooking();
  }

  timeSlotSelected(event){
    //TODO: check if the range hits an occupied slot
    //check if the slot has a title (occupied)
    if(event.hasOwnProperty('title')){
      console.log('this is taken');
      //maybe show an error message saying you cant book this because its taken  
    } else if (event.hasOwnProperty('slots')) {
      console.log('this is available');
      const { start, end } = event;
      this.setState({start});
      this.setState({end});
      this.setState({ buttonStatus:false });  
    }
    
  }

  componentDidMount(){
    // TODO: Grabbing the teacher_id and student_id from the state
    const getBookings = async () => {
      try {
        // let bookings = await fetchTeacherBookings(this.state.teacher_id);
        let bookings = await fetchTeacherBookings(1);
        //datefying the string dates
        bookings.map((booking) => {
          booking.title = 'unavailable'
          booking.start = new Date(booking.start);
          booking.end = new Date(booking.end);
          return booking;
        });
        this.setState({bookings});
      } catch (error) {
        console.error('error while trying to set the state from server bookings', error);
      }
    };
    getBookings();    
  }

  render(){
    return (
      <React.Fragment>
        <h3 className="callout">
          Drag the mouse over the calendar to select a time range.
        </h3>
        <p>Selected timeslot: from {String(this.state.start)} to {String(this.state.end)}</p>
        <button type="button" onClick={this.submitBooking} 
          disabled={this.state.buttonStatus} >Submit
        </button>
        <BigCalendar
          style={ {height: '100%'} }
          selectable
          events={ this.state.bookings }
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
  


