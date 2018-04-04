import React, { Component } from 'react';
import Chat from './Chat.jsx';

class Conference extends Component {
  constructor(props) {
    super(props);
    const { booking } = this.props.history.location.state;
    const { id, teacher_id, student_id, title } = booking;
    this.state = { id, teacher_id, student_id, title };
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
