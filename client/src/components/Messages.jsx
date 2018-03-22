import React, { Component } from 'react';
import axios from 'axios';
import ConversationList from './ConversationList.jsx';
export default class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipient: '',
      message: '',
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
    this.sendMessage = this.sendMessage.bind(this);
  }

  async sendMessage() {
    try {
      let sender_id = parseInt(localStorage.user_id);
      let id = await axios.get(
        `http://localhost:3000/user/getIdByUsername/${this.state.recipient}`
      );
      let message = await axios.post(
        `http://localhost:3000/user/messages/sendMessage`,
        {
          text: this.state.message,
          sender_id: sender_id,
          recipient_id: id.data.id
        }
      );
    } catch (error) {
      console.log('Error with sendMessage', error);
      return;
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentWillMount() {
    this.fetchAllMessages();
  }

  render() {
    return (
      <div>
        Recipient:{' '}
        <input
          type="text"
          name="recipient"
          value={this.state.recipient}
          onChange={e => this.handleChange(e)}
        />{' '}
        <input
          type="text"
          name="message"
          value={this.state.message}
          onChange={e => this.handleChange(e)}
        />
        <button onClick={() => this.sendMessage()}>Send </button>
        <ConversationList messages={this.state.messages} />
      </div>
    );
  }
}
