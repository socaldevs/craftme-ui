import React, { Component } from 'react';
import io from 'socket.io-client/dist/socket.io.js';

class Chat extends Component {
  constructor(props) {
    super(props); //super puts props on this... this.props = props;
    
    this.state = {
      handle: '',
      message: '',
      messages: [],
      feedback: '',
    }
  }
  componentDidMount() { //CDM doesn't fire on re render, only on initial mount
    this.socket = io('http://localhost:3001/');

    this.socket.on('connect', () => {
      this.socket.emit('room', this.props.roomId);
    });

    this.socket.on('message', (data) => console.log('message from server', data));

    this.socket.on('chat', (data) => {
      this.setState({ feedback: '' });
      this.setState({ messages: [...this.state.messages, data] });
    })
    this.socket.on('typing', (data) => {
      this.setState({ feedback: data});
    })
  }

  componentWillReceiveProps(nextProps) {
    // this.props still old!
    if (this.props.roomId !== nextProps.roomId) { //only do this if props.roomId has updated( enter new room )
      console.log('-- roomid has changed, old, new', this.props.roomId, nextProps.roomId);
      this.socket.emit('room', nextProps.roomId);
    }
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
    console.log('Im rendering MOrty! and room Id', this.props.roomId)
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
      </div>
    );
  } 
}

export default Chat;