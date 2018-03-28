const axios = require('axios');

const SERVER = process.env.REST_PATH;


export const fetchTeacherAvailability = async (teacher_id) => {
  try {
    const response = await axios.get(`${SERVER}/student/viewTeacherAvailability/${teacher_id}`);
    console.log('this is the bookings from server: ', response.data);
    return response.data;
  } catch (error) {
    console.error('Error while fetching the teacher bookings', error);
    return;
  }
};

export const submitBookingToServer = async (booking) => {
  const { student_id, teacher_id, start, end, selected_availability_id, title } = booking; 
  try {
    const response = await axios.post(`${SERVER}/student/submitBooking`, {
      student_id,
      teacher_id,
      start,
      end,
      selected_availability_id,
      title
    });
    // the created booking
    
    return response.data;
  } catch (error) {
    console.error('Error while creating booking', error);
    return;
  }
};

export const submitAvailabilityToServer = async (availability) => {
  const { teacher_id, start, end } = availability; 
  try {
    const response = await axios.post(`${SERVER}/teacher/submitAvailability`, {
      teacher_id,
      start,
      end,
    });
    // the created availability
    return response.data;
  } catch (error) {
    console.error('Error while creating availability', error);
    return;
  }
};

export const fetchUserUpcomingBookings = async (userId) => {
  try {
 
    const response = await axios
      .get(`${SERVER}/user/getAllBookingsForUser/`,{
        params: {
          userId
        }
      });    
    
    return response.data;
  } catch (error) {
    console.error('Error while fetching User Upcoming Bookings', error);
    return;    
  }

};


export const getUserPastLessons = async (userId) => {
  try {
    const response = await axios.get(`${SERVER}/user/fetchAllLessons/`,{
      params: {
        userId
      }
    });
    console.log('chats from server', response.data);
    return response.data;
  } catch (error) {
    console.error('Error while getting user past lessons ', error);
    return;
  }
  
}; 



