import React, { Component } from 'react';
import io from 'socket.io-client/dist/socket.io.js';

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      handle: '',
      message: '',
      messages: [],
      feedback: '',
    }
    this.room = 'abc123';
  }
  componentDidMount() {
    this.socket = io('http://localhost:3001/');

    // this.socket.on('connect', () => {
    //   this.socket.emit('room', this.room);
    // })
    // this.socket.on('message', (data) => console.log('message from server', data));

    this.socket.on('chat', (data) => {
      this.setState({ feedback: '' });
      this.setState({ messages: [...this.state.messages, data] });
    })
    this.socket.on('typing', (data) => {
      this.setState({ feedback: data});
    })
  }

  setText(e) {
    if (e.target.id === 'handle') {
      this.setState({ handle: e.target.value });
    } else {
      this.setState({ message: e.target.value });
    }
    this.socket.emit('typing', `${this.state.handle} is typing...`);
  }

  sendChat() {
    this.socket.emit('chat', {
      handle: this.state.handle,
      message: this.state.message
    })
    console.log('chat sent', this.state.handle, this.state.message);
  }

  render() {
    return (
      <div>
        Hello from Chat!
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
      </div>
    );
  } 
}

export default Chat;