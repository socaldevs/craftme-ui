import React, { Component } from 'react';
import Chat from './Chat.jsx';

class Conference extends Component {
  constructor(props) {
    super(props);
<<<<<<< HEAD
    this.state = {
      id: null,
      teacher_id: null,
      student_id: null,
      title: null,
    }
  }

  componentDidMount() {
    const { booking } = this.props.history.location.state;
    const { id, teacher_id, student_id, title } = booking; 
    this.setState({
      id,
      teacher_id,
      student_id,
      title,
    });
=======
    const { booking } = this.props.history.location.state;
    const { id, teacher_id, student_id } = booking;
    this.state = { id, teacher_id, student_id };
>>>>>>> [CWU] d/c stream and peer
  }

  render() {
    const { id, teacher_id, student_id, title } = this.state
    return (
      <Chat
        {...this.props}
        roomId={id}
        teacher_id={teacher_id}
        student_id={student_id}
        title={title}
      />
    );
  }
}

export default Conference;
