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
        process.env.REST_PATH +`/user/fetchMongoChatById/${id}`
      );
      console.log('chat', chat);
      this.setState({ chats: chat.data });
    } catch (error) {
      console.log('Error with grabLessons', error);
      return;
    }
  }

  async componentDidMount() {
    let id = this.props.currentId;
    try {
      let data = await axios.get(
        process.env.REST_PATH +`/user/fetchAllLessons/${id}`
      );
      this.setState({ lessons: data.data });
    } catch (error) {
      console.log('Error with fetchLessons', error);
    }
  }

  render() {
    return (
      <div>
        {this.state.lessons.map((lesson, i) => {
          return (
            <div key={i} data-id={lesson.chat_id} onClick={e => this.grabLessons(e)}>
              {' '}
              {lesson.teacher_id}
              {lesson.notes}
            </div>
          );
        })}
        <br />
        <div>
          {this.state.chats.length
            ? this.state.chats.map((chat, i) => {
                return <div key={i}>{chat}</div>;
              })
            : null}
        </div>
      </div>
    );
  }
}
