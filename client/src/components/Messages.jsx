import React, { Component } from 'react';
import axios from 'axios';
import Conversation from './Conversation.jsx';
import ConversationList from './ConversationList.jsx';
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
    console.log('messages: ', this.state.messages);
    return (
      <div>
        <ConversationList messages={this.state.messages} />
      </div>
    );
  }
}
