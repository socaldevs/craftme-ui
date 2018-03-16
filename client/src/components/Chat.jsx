import React, { Component } from 'react';
import io from 'socket.io-client/dist/socket.io.js';

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      handle: '',
      message: '',
      display: '',
      feedback: '',
    }
  }
  componentDidMount() {
    this.socket = io('http://localhost:3001');
    this.socket.on('chat', (data) => {
      console.log('data from server',data);
      this.setState({ display: `${this.state.display}\n${data.handle}: ${data.message}`});
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
          <div id="output">{this.state.display}</div>
          <div id="feedback"></div>
        </div>
        <input id="handle" type="text" placeholder="Handle" value={this.state.handle} onChange={e => this.setText(e)}/>
        <input id="message" type="text" placeholder="Message" value={this.state.message} onChange={e => this.setText(e)}/>
        <button id="send" onClick={() => this.sendChat()}>Send</button>
      </div>
    );
  } 
}

export default Chat;