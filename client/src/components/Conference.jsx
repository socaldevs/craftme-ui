import React, { Component } from 'react';
import Chat from './Chat.jsx'

class Conference extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      teacher_id: null,
      student_id: null,
    }
  }

  componentDidMount() {
    const { booking } = this.props.history.location.state;
    const { id, teacher_id, student_id } = booking; 
    this.setState({
      id,
      teacher_id,
      student_id,
    });
  }
  
  render() {
    const { id, teacher_id, student_id } = this.state
    return (
      <Chat 
        {...this.props}
        roomId={id}
        teacherId={teacher_id}
        studentId={student_id}
      />
    )
  }
}

export default Conference;