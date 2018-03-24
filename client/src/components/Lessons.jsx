import React, { Component } from 'react';
import axios from 'axios';
export default class Lessons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lessons: [],
      chats: []
    };
    this.grabLessons = this.grabLessons.bind(this);
  }

  async grabLessons(e) {
    try {
      let id = e.target.getAttribute('data-id');
      let chat = await axios.get(
        `http://localhost:3000/user/fetchMongoChatById/${id}`
      );
      console.log('chat', chat);
      this.setState({ chats: chat.data });
    } catch (error) {
      console.log('Error with grabLessons', error);
      return;
    }
  }

  async componentDidMount() {
    let id = parseInt(localStorage.getItem('user_id'));
    try {
      let data = await axios.get(
        `http://localhost:3000/user/fetchAllLessons/${id}`
      );
      this.setState({ lessons: data.data });
    } catch (error) {
      console.log('Error with fetchLessons', error);
    }
  }

  render() {
    return (
      <div>
        {this.state.lessons.map(lesson => {
          return (
            <div data-id={lesson.chat_id} onClick={e => this.grabLessons(e)}>
              {' '}
              {lesson.teacher_id}
              {lesson.notes}
            </div>
          );
        })}
        <br />
        <div>
          {this.state.chats.length
            ? this.state.chats.map(chat => {
                return <div>{chat}</div>;
              })
            : null}
        </div>
      </div>
    );
  }
}
