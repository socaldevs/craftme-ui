import React, { Component } from 'react';
import axios from 'axios';

class ConversationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversation: [],
      recipient: '',
      message: '',
    };
    this.grabConversations = this.grabConversations.bind(this);
    this.sendMessage = this.sendMessage.bind(this);    
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async sendMessage() {
    try {
      const sender_id = this.props.props.currentId;
      const id = await axios.get(
        process.env.REST_PATH +`/user/getIdByUsername/${this.state.recipient}`
      );
      const { data } = await axios.post(
        process.env.REST_PATH +`/user/messages/sendMessage`,
        {
          text: this.state.message,
          sender_id: sender_id,
          recipient_id: id.data.id
        }
      );
      const message = data;
      message.sender = this.props.props.currentUser;
      this.setState({
        message: '',
        recipient: '',
        conversation: [...this.state.conversation, message]
      })
    } catch (error) {
      console.log('Error with sendMessage', error);
      return;
    }
  }

  async grabConversations(e) {
    try {
      const id = parseInt(e.target.getAttribute('data-id'));
      const conversations = await axios.get(
        process.env.REST_PATH + `/user/messages/fetchAllMessagesByConversationId/${id}`
      );
      this.setState({ conversation: conversations.data });
    } catch (error) {
      console.log('Error with grabConversations', error);
      return;
    }
  }

  render() {
    return (
      <div>
        <div className="speech-bubble">
          Recipient:{' '}
          <input
            type="text"
            name="recipient"
            value={this.state.recipient}
            onChange={e => this.handleChange(e)}
          />{' '}
          <br />
          Message:{' '}
          <input
            type="text"
            name="message"
            value={this.state.message}
            onChange={e => this.handleChange(e)}
          />
          <button onClick={() => this.sendMessage()}>Send </button>
        </div>
        <div className="wrapper">
          {this.props.conversations.map((conversation, i) => {
            return (
                <div className="c1" key={i}>
                  <div key={i} className="thoughtbubble" data-id={conversation.id} onClick={e => this.grabConversations(e)} key={i}>
                    View your conversation with: 
                    {conversation.sender !== this.props.props.currentUser 
                      ? conversation.sender : 
                      conversation.recipient}
                  </div>
                </div>
            )}
          )}
          <br />
          <div className="c2">
            {this.state.conversation.map((conv, i) => {
                  return (
                    <div className="conversation" key={i}>
                      {conv.sender} : {conv.text}
                    </div>
                  );
                })
              }
          </div>
        </div>
      </div>
    );
  }
}

export default ConversationList;
