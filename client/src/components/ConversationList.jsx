import React, { Component } from 'react';
import axios from 'axios';
import { fetchIdByUsername, sendMessage, fetchAllMessagesByConversationId, getConversationId } from '../apiCaller.js';

class ConversationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversation: [],
      message: '',
      recipient: '',
    };
    this.grabConversations = this.grabConversations.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async sendMessage() {
    try {
      const { currentId } = this.props
      const id = await fetchIdByUsername(this.state.recipient);
      const data = await sendMessage(this.state.message, currentId, id);
      const message = data.data;
      message.sender = this.props.currentUser;
      await this.props.updateConvo({recipient: this.state.recipient, sender: this.props.currentUser});
      const convo = await this.grabConversations();
      await this.setState({
        message: '',
        recipient: '',
        conversation: convo,
      })
    } catch (error) {
      console.log('Error with sendMessage', error);
      return;
    }
  }

  async grabConversations(e) {
    try {
      if (e) {
        const id = parseInt(e.target.getAttribute('data-id'));
        const { data } = await fetchAllMessagesByConversationId(id);
        this.setState({ conversation: data });
      } else {
        const { recipient } = this.state;
        const id = await fetchIdByUsername(recipient);
        const convo = await getConversationId(this.props.currentId, id);
        const messages = await fetchAllMessagesByConversationId(convo.data[0].id)
        return messages.data;
      }
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
            className="recipient-input"
          />{' '}
          <br />
          Message:{' '}
          <input
            type="text"
            name="message"
            value={this.state.message}
            onChange={e => this.handleChange(e)}
            className="message-input"
          />
          <button className="card-button" onClick={this.sendMessage}>Send </button>
        </div>
        <div className="wrapper">
          <div className="c1"> 
            {
              this.props.conversations.map((conversation, i) => {
              return (
                  <div key={i}>
                    <div className="thoughtbubble" data-id={conversation.id} onClick={e => this.grabConversations(e)} key={i}>
                      View your conversation with: 
                      {conversation.sender === this.props.currentUser 
                        ? conversation.recipient : 
                        conversation.sender}
                    </div>
                  </div>
              )}
            )}
          </div>
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
