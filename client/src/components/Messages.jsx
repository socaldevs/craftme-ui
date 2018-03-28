import React, { Component } from 'react';
import axios from 'axios';
import ConversationList from './ConversationList.jsx';
export default class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipient: '',
      message: '',
      conversations: [],
    };
    this.sendMessage = this.sendMessage.bind(this);
  }

  async sendMessage() {
    try {
<<<<<<< HEAD
      let sender_id = this.props.currentId;
=======
      let sender_id = parseInt(this.props.currentId);
>>>>>>> [Front] signup complete with image render
      let id = await axios.get(
        process.env.REST_PATH +`/user/getIdByUsername/${this.state.recipient}`
      );
      let message = await axios.post(
        process.env.REST_PATH +`/user/messages/sendMessage`,
        {
          text: this.state.message,
          sender_id: sender_id,
          recipient_id: id.data.id
        }
      );
      this.setState({
        text: '',
        recipient: ''
      })

    } catch (error) {
      console.log('Error with sendMessage', error);
      return;
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async componentDidMount() {
    try {
<<<<<<< HEAD
      let id = this.props.currentId;
=======
      let id = parseInt(this.props.currentId);
>>>>>>> [Front] signup complete with image render
      let data = await axios.get(
        process.env.REST_PATH +`/user/messages/fetchAllConversationsById/${id}`
      );
      this.setState({ conversations: data.data });
    } catch (error) {
      console.log('Error with fetchAllMessages on front end', error);
      return;
    }
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
        <ConversationList props={this.props} conversations={this.state.conversations} />
      </div>
    );
  }
}
