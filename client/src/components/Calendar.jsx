import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Moment from 'moment';
import {
  fetchTeacherAvailability,
  submitBookingToServer,
  submitAvailabilityToServer,
  fetchUserUpcomingBookings,
  displayNotification,
} from './../apiCaller.js';
import Popup from './Popup.jsx';
import FeedbackAlert from './FeedbackAlert.jsx';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(Moment));

// helper
const doesOverlap = (calendarEvents, event) => {
  const eventStart = new Moment(event.start);
  const eventEnd = new Moment(event.end);
  if (eventStart.isBefore(new Moment())) {
    return true;
  }
  const overlaps = calendarEvents.findIndex((cEvent) => {
    const cEventStart = new Moment(cEvent.start);
    const cEventEnd = new Moment(cEvent.end);
    // First case: if the start of the selected slot is in between the
    // beginning the and the end of the calendar event
    // Second case: if the end of the selected slot is in between the
    // beginning the and the end of the calendar event

    if (cEventStart.isBetween(eventStart, eventEnd) ||
      cEventEnd.isBetween(eventStart, eventEnd) ||
      eventStart.isBetween(cEventStart, cEventEnd) ||
      eventEnd.isBetween(cEventStart, cEventEnd) ||
      eventStart.isSame(cEventStart)
    ) {
      return true;
    }
    return false;
  });

  return overlaps !== -1;
};

export default class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
      start: false,
      end: false,
      selected_availability_id: 0,
      disableButton: true,
      userType: 1,
      showPopup: false,
      slotTextVisibility: 'hidden-element',
      alertMessage: '',
      alertVisibility: 'hidden-element',
      alertType: '',
    };

    this.submitBooking = this.submitBooking.bind(this);
    this.timeSlotSelected = this.timeSlotSelected.bind(this);
    this.submitAvailability = this.submitAvailability.bind(this);
    this.renderStudentElements = this.renderStudentElements.bind(this);
    this.renderTeacherElements = this.renderTeacherElements.bind(this);
    this.getTeacherAppointments = this.getTeacherAppointments.bind(this);
    this.getTeacherAvailability = this.getTeacherAvailability.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
  }


  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
    });
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
      const availabilityToSend = {
        teacher_id: currentId,
        start,
        end,
      };
      const availability = await submitAvailabilityToServer(availabilityToSend);
      // datefying the string date
      availability.title = 'Open';
      availability.start = new Date(availability.start);
      availability.end = new Date(availability.end);
      // updating the events on the calendar
      await this.setState({ events: [...this.state.events, availability] });
      await this.togglePopup();
    } catch (error) {
      console.error('error while trying to submit availability', error);
    }
  }

  async submitBooking() {
    const { start, end, selected_availability_id } = this.state;
    const { teacher, student, matchedCraft } = this.props.history.location.state;
    const title = `${matchedCraft.name} | Teacher: ${teacher.username} | Student: ${student.currentUser}`;
    try {
      const bookingToSend = {
        student_id: student.currentId,
        teacher_id: teacher.id,
        title,
        start,
        end,
        selected_availability_id,
      };

      // TO DO: create a confirmation modal popup to and fill it with the booking
      const booking = await submitBookingToServer(bookingToSend);
      // datefying the string date
      booking.title = title;
      booking.start = new Date(booking.start);
      booking.end = new Date(booking.end);

      const updatedAvailabilities = this.state.events.filter((availability) => {
        // getting rid of the booked slot
        if (availability.id === bookingToSend.selected_availability_id) {
          return false;
        }
        return true;

        // if(String(availability.start) === String(booking.start) &&
        // String(availability.end) === String(booking.end)){
        //   return false;
        // } else {
        //   return true;
        // }
      });
      await this.setState({ events: updatedAvailabilities });
      // redirect to lessons after a successful booking
      this.props.history.push('/lessons');
    } catch (error) {
      console.error('error while trying to submit booking', error);
    }
  }

  async timeSlotSelected(timeslot) {
    const { userType } = this.state;

    // if the user is a teacher
    if (userType === 0) {
      // check if the action is drag
      // the drag action is to create availability for the teacher
      if (timeslot.hasOwnProperty('slots')) {
        // check if the availability created overlaps with a different event
        if (!doesOverlap(this.state.events, timeslot)) {
          // allow the teacher to submit the availability by enabling the submission button
          const { start, end } = timeslot;
          await this.setState({
            start,
            end,
            disableButton: false,
            slotTextVisibility: 'visible-element',
          });
        } else {
          // if theres an overlap display an error message
          await this.setState({
            start: false,
            end: false,
            disableButton: true,
            slotTextVisibility: 'hidden-element',
          });

          await displayNotification(
            this, 2000,
            {
              alertMessage: 'Invalid timeslot!',
              alertType: 'alert-danger',
            },
          );
        }
      } else {
        await this.setState({ disableButton: true });
      }
      // if the user is a student
    } else if (userType === 1) {
      // check if the event is clicked
      // events (availabilities) have a teacher id on them
      if (timeslot.hasOwnProperty('teacher_id')) {
        const { start, end, id } = timeslot;
        // enable the button and allow the student to book the availability
        await this.setState({
          start,
          end,
          disableButton: false,
          selected_availability_id: id,
          slotTextVisibility: 'visible-element',
        });
      } else {
        // it's not an event (availability) so
        // disable the button
        await this.setState({
          start: false,
          end: false,
          disableButton: true,
          slotTextVisibility: 'hidden-element',
        });

        await displayNotification(
          this, 2000,
          {
            alertMessage: 'Invalid appointment! Use your best judgment!',
            alertType: 'alert-danger',
          },
        );
      }
    }
  }

  renderStudentElements() {
    const alertFeedbackCustomStyle = {
      marginTop: '0.5em',
      marginBottom: '0.5em',
    };
    const options = {
      weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
    };
    const start = new Date(this.state.start).toLocaleTimeString('en-US', options);
    const end = new Date(this.state.end).toLocaleTimeString('en-US', options);

    return (
      <div className="calendar-controls">
        <FeedbackAlert
          alertVisibility={this.state.alertVisibility}
          alertType={this.state.alertType}
          alertMessage={this.state.alertMessage}
          customStyle={alertFeedbackCustomStyle}
        />
        <h3 className="callout title">
          To book appointment:
        </h3>
        <p>Click on the availability spot to select.</p>
        <p className={this.state.slotTextVisibility}>Selected timeslot: from {start} to {end}</p>
        <button
          type="button"
          onClick={this.submitBooking}
          className={`card-button ${this.state.disableButton && 'disabled'}`}
          disabled={this.state.disableButton}
        >Book appointment
        </button>
      </div>
    );
  }

  renderTeacherElements() {
    const alertFeedbackCustomStyle = {
      marginTop: '0.5em',
      marginBottom: '0.5em',
    };

    const options = {
      weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
    };
    const start = new Date(this.state.start).toLocaleTimeString('en-US', options);
    const end = new Date(this.state.end).toLocaleTimeString('en-US', options);
    return (
      <div className="calendar-controls">
        <FeedbackAlert
          alertVisibility={this.state.alertVisibility}
          alertType={this.state.alertType}
          alertMessage={this.state.alertMessage}
          customStyle={alertFeedbackCustomStyle}
        />
        <h3 className="callout title">
          To allocate availability:
        </h3>
        <p>Drag the mouse over the calendar to select a time range.</p>
        <p className={this.state.slotTextVisibility}>Selected timeslot: from {start} to {end}</p>
        <button
          type="button"
          onClick={this.submitAvailability}
          className={`card-button ${this.state.disableButton && 'disabled'}`}
          disabled={this.state.disableButton}
        >Submit
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
      // datefying the string dates
      availabilities = availabilities.map((availability) => {
        availability.title = 'Open';
        availability.taken = false;
        availability.start = new Date(availability.start);
        availability.end = new Date(availability.end);
        return availability;
      });
      await this.setState({ events: [...this.state.events, ...availabilities] });
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

  eventStyleGetter(event) {
    let backgroundColor;
    if (event.taken) {
      backgroundColor = '#d9534f';
    } else {
      backgroundColor = '#5cb85c';
    }

    const style = {
      backgroundColor,
    };
    return { style };
  }


  async componentDidMount() {
    const { teacher } = this.props.history.location.state || { teacher: { id: this.props.currentId } };

    this.getTeacherAvailability(teacher);

    // if user type is teacher get their appointments
    if (this.props.currentType === 0) {
      this.getTeacherAppointments(teacher);
    }

    await this.setState({ userType: this.props.currentType });
  }

  render() {
    const options = {
      weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
    };
    const start = new Date(this.state.start).toLocaleTimeString('en-US', options);
    const end = new Date(this.state.end).toLocaleTimeString('en-US', options);
    return (
      <div className="calendar">
        <React.Fragment>

          {
            this.state.userType === 1 ?
              this.renderStudentElements() :
              this.renderTeacherElements()
          }
          <BigCalendar
            style={{ minHeight: '100vh' }}
            selectable
            formats={{
              // dateFormat:'mm dd yyyy',
              dayFormat: (date, culture, localizer) =>
              localizer.format(date, 'dd MM/DD', culture),

            }}
            events={this.state.events}
            defaultView="week"
            scrollToTime={new Date(1970, 1, 1, 6)}
            defaultDate={new Date()}
            onSelectEvent={this.timeSlotSelected}
            onSelectSlot={this.timeSlotSelected}
            eventPropGetter={this.eventStyleGetter}
          />
          {
              this.state.showPopup ?
                <Popup
                  text={`${start} - ${end} submitted!`}
                  closePopup={this.togglePopup}
                />
              : null
            }
        </React.Fragment>
      </div>
    );
  }
}

