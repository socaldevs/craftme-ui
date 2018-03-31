const axios = require('axios');

const SERVER = process.env.REST_PATH;


export const fetchTeacherAvailability = async (teacher_id) => {
  try {
    const response = await axios.get(`${SERVER}/student/viewTeacherAvailability/${teacher_id}`);
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
      .get(`${SERVER}/user/getAllBookingsForUser/${userId}`);    
    return response.data;
  } catch (error) {
    console.error('Error while fetching User Upcoming Bookings', error);
    return;    
  }

};


export const getUserPastLessons = async (userId) => {
  try {
    const response = await axios.get(`${SERVER}/user/fetchAllLessons/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error while getting user past lessons ', error);
    return;
  }
  
}; 

export const getChatFromLesson = async (chatId) => {
  try {
    let chat = await axios.get(
      process.env.REST_PATH +`/user/fetchMongoChatById/${chatId}`
    );
    return chat.data;
  } catch (error) {
    console.log('Error with getChatFromLesson', error);
    return;
  }
}


export const fetchRemoteTeachersForCraft = async (craft_id) => {
  try {
    const { data } = await axios.get(`${SERVER}/student/fetchAllTeachersForCraft/${craft_id}`);
    // getting the teachers out of the queried craft_teachers table result
    return data[0]['users'];
  } catch (error) {
    console.error('Error while getting teachers for craft', error);
  }
};


