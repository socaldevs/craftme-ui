import React, { Component } from 'react';
import axios from 'axios';
export default class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
    this.fetchAllMessages = async () => {
      try {
        let id = parseInt(localStorage.user_id);
        let data = await axios.get(
          `http://localhost:3000/user/messages/fetchAllMessages/${id}`
        );
        this.setState({ messages: data.data });
      } catch (error) {
        console.log('Error with fetchAllMessages on front end', error);
        return;
      }
    };
  }

  componentWillMount() {
    this.fetchAllMessages();
  }

  render() {
    console.log(this.state.messages);
    return (
      <div>
        {this.state.messages.map(message => {
          return (
            <div>
              {message.sender_id} : {message.text}
            </div>
          );
        })}
      </div>
    );
  }
}
