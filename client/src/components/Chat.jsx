import React, { Component } from 'react';
import io from 'socket.io-client/dist/socket.io.js';
import axios from 'axios';

class Chat extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      handle: '',
      message: '',
      messages: [],
      feedback: '',
    }
  }
  componentDidMount() { 
    this.socket = io('http://localhost:3001/');
    this.socket.on('connect', () => {
      this.socket.emit('room', this.props.roomId);
    });
    this.socket.on('message', (data) => console.log('message from server', data));
    this.socket.on('chat', (data) => {
      this.setState({ 
        messages: [...this.state.messages, data], 
        feedback: '',
      });
    })
    this.socket.on('typing', (data) => {
      this.setState({ feedback: data});
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.roomId !== nextProps.roomId) { 
      this.socket.emit('exit', this.props.roomId);
      this.socket.emit('room', nextProps.roomId);
      this.setState({ messages: [], feedback: '' });
    }
  }

  async saveChat () {
    const { messages } = this.state;
    try {
      const data = await axios.post('http://localhost:3001/chat/save/', { messages });
      console.log('await axios data', data);
    } catch(err) {
      console.log('err from Chat', err);
    }
  }

  async fetchChat () {
    const testId = '5ab06c447ee8e1cddeddd726'; //TEST
    try {
      const data = await axios.get(`http://localhost:3001/chat/fetch/${testId}`);
      console.log('await axios data', data);
    } catch(err) {
      console.log('err from Chat', err);
    }
  }

  setText(e) {
    if (e.target.id === 'handle') {
      this.setState({ handle: e.target.value });
    } else {
      this.setState({ message: e.target.value });
      this.socket.emit('typing', {
        room: this.props.roomId,
        feedback: `${this.state.handle} is typing...`,
      });
    }
  }

  sendChat() {
    this.socket.emit('chat', {
      room: this.props.roomId,
      handle: this.state.handle,
      message: this.state.message
    });
  }

  render() {
    return (
      <div>
        Hello from Chat #{this.props.roomId}!
        <div id="chat-window">
          <div id="output">
            {this.state.messages.map((data,i) => {
              return <div key={i}><strong>{data.handle}</strong>: {data.message}</div>
            })}
          </div>
          <div id="feedback">{this.state.feedback}</div>
        </div>
        <input id="handle" type="text" placeholder="Handle" value={this.state.handle} onChange={e => this.setText(e)}/>
        <input id="message" type="text" placeholder="Message" value={this.state.message} onChange={e => this.setText(e)}/>
        <button id="send" onClick={() => this.sendChat()}>Send</button>
        <button id="save" onClick={() => this.saveChat()}>SAVE CHAT</button>
        <button id="fetch" onClick={() => this.fetchChat()}>RETRIEVE CHAT</button>
      </div>
    );
  } 
}

export default Chat;