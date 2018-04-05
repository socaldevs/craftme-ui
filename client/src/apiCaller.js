const axios = require('axios');

const SERVER = process.env.REST_PATH;


export const fetchTeacherAvailability = async (teacher_id) => {
  try {
    const response = await axios.get(`${SERVER}/student/viewTeacherAvailability/${teacher_id}`);
    return response.data;
  } catch (error) {
    console.error('Error while fetching the teacher bookings', error);
  }
};

export const submitBookingToServer = async (booking) => {
  const {
    student_id, teacher_id, start, end, selected_availability_id, title,
  } = booking;
  try {
    const response = await axios.post(`${SERVER}/student/submitBooking`, {
      student_id,
      teacher_id,
      start,
      end,
      selected_availability_id,
      title,
    });
    // the created booking

    return response.data;
  } catch (error) {
    console.error('Error while creating booking', error);
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
  }
};

export const fetchUserUpcomingBookings = async (userId) => {
  try {
    const response = await axios
      .get(`${SERVER}/user/getAllBookingsForUser/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error while fetching User Upcoming Bookings', error);
  }
};


export const getUserPastLessons = async (userId) => {
  try {
    const response = await axios.get(`${SERVER}/user/fetchAllLessons/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error while getting user past lessons ', error);
  }
};

export const getChatFromLesson = async (chatId) => {
  try {
    const chat = await axios.get(`${process.env.REST_PATH}/user/fetchMongoChatById/${chatId}`);
    return chat.data;
  } catch (error) {
    console.log('Error with getChatFromLesson', error);
  }
};

export const fetchRatingsForTeacher = async (teacher_id) => {
  try {
    const ratings = await axios.get(`${process.env.REST_PATH}/user/calculateAverageRatingForTeacher/${teacher_id}`);
    return ratings;
  } catch (error) {
    console.log('Error with fetchRatingsForTeacher', error);
  }
};

export const fetchFeedbackForLesson = async (lesson_id) => {
  try {
    const feedback = await axios.get(`${process.env.REST_PATH}/user/fetchFeedbackForLesson/${lesson_id}`);
    return feedback;
  } catch (error) {
    console.log('Error with fetchFeedbackForLesson', error);
  }
};


export const fetchRemoteTeachersForCraft = async (craft_id) => {
  try {
    const { data } = await axios.get(`${SERVER}/student/fetchAllTeachersForCraft/${craft_id}`);
    // getting the teachers out of the queried craft_teachers table result
    return data[0].users;
  } catch (error) {
    console.error('Error while getting teachers for craft', error);
  }
};

export const fetchIdByUsername = async (username) => {
  try {
    const { data } = await axios.get(`${SERVER}/user/getIdByUsername/${username}`);
    return data.id;
  } catch (error) {
    console.log('Error with fetchIdByUsername', error);
  }
};

export const sendMessage = async (message, sender_id, recipient_id) => {
  try {
    const data = await axios.post(
      `${SERVER}/user/messages/sendMessage`,
      {
        text: message,
        sender_id,
        recipient_id,
      },
    );
    return data;
  } catch (error) {
    console.log('Error with sendMessage', error);
  }
};

export const fetchAllMessagesByConversationId = async (id) => {
  try {
    const data = await axios.get(`${SERVER}/user/messages/fetchAllMessagesByConversationId/${id}`);
    return data;
  } catch (error) {
    console.log('Error with fetchAllMessagesByConversationId', error);
  }
};

export const getConversationId = async (user_id, sender_id) => {
  try {
    const data = await axios.get(`${SERVER}/user/getConversationId/${user_id}/${sender_id}`);
    return data;
  } catch (error) {
    console.log('Error with getConversationId', error);
  }
};

export const fetchAllConversationsById = async (id) => {
  try {
    const data = await axios.get(`${SERVER}/user/messages/fetchAllConversationsById/${id}`);
    return data;
  } catch (error) {
    console.log('Error with fetchAllConversationsById', error);
  }
};


// helper

export const displayNotification = async (context, displayTime, stateProperties) => {
  stateProperties.alertVisibility = 'visible-element';
  await context.setState(stateProperties);

  setTimeout(() => {
    context.setState({
      alertVisibility: 'hidden-element',
    });
  }, displayTime);
};
