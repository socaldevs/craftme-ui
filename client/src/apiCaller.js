const axios = require('axios');

const SERVER = 'http://localhost:3000';


export const fetchTeacherBookings = async (teacher_id) => {
  try {
    const response = await axios.get(`${SERVER}/student/viewTeacherAvailability/${teacher_id}`);
    console.log('this is the bookings from server: ', response.data);
    return response.data;
  } catch (error) {
    console.error('Error while fetching the teacher bookings', error);
    return;
  }
};

export const submitBookingToServer = async (student_id, teacher_id, start, end) => {
  try {
    const response = await axios.post(`${SERVER}/student/submitBooking`, {
      student_id,
      teacher_id,
      start,
      end
    });
    //the created booking
    return response.data;
  } catch (error) {
    console.error('Error while creating booking', error);
    return;
  }
};



