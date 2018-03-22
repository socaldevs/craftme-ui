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
      peerId: '',
      otherPeerId: '',
    }
  }
  componentDidMount() { 
    this.socket = io('http://localhost:3001/');
    this.socket.on('connect', () => {
      this.socket.emit('room', this.props.roomId);
    });
    this.socket.on('confirmation', (data) => {
      console.log('message from server:', data)
      if (this.state.messages.length !== 0) {
        this.socket.emit('renderchat', {
          messages: this.state.messages,
          room: this.props.roomId,
        });
      } 
    });
    this.socket.on('renderchat', (data) => {
      this.setState({ messages: [...data]});
    })
    this.socket.on('chat', (data) => {
      this.setState({ 
        messages: [...this.state.messages, data], 
        feedback: '',
      });
    })
    this.socket.on('typing', (data) => {
      this.setState({ feedback: data});
    })
    this.socket.on('getOtherPeerId', (data) => {
      this.socket.emit('fetchedPeerId', {
        peerId: this.state.peerId,
        room: this.props.roomId,
      });
    });
    this.socket.on('fetchedPeerId', (data) => {
      this.setState({ otherPeerId: data });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.roomId !== nextProps.roomId) { 
      this.socket.emit('exit', this.props.roomId);
      this.socket.emit('room', nextProps.roomId);
      // this.peer.disconnect();
      this.setState({ messages: [], feedback: '' });
    }
    //P2P
    this.peer = new Peer({key: 'lwjd5qra8257b9'});
    this.peer.on('open', (id) => {
      this.setState({ peerId: id });
    });
    this.peer.on('call', (call) => {
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
      navigator.getUserMedia({video: true, audio: true}, (stream) => {
        call.answer(stream); 
        call.on('stream', (remoteStream) => {
          let video = document.createElement('video');
          document.body.append(video);
          video.src = window.URL.createObjectURL(remoteStream);
          video.play();
        });
      }, (err) => {
        console.log('Failed to get local stream', err);
      });
    });
    this.peer.on('disconnect', () => console.log('Peer has been disconnected'));
  }

  async saveChat () {
    const { messages } = this.state;
    try {
      const data = await axios.post('http://localhost:3001/chat/save/', { messages });
    } catch(err) {
      console.log('err from saveChat', err);
    }
  }

  async fetchChat () {
    const testId = '5ab06c447ee8e1cddeddd726'; //TEST
    try {
      const data = await axios.get(`http://localhost:3001/chat/fetch/${testId}`);
    } catch(err) {
      console.log('err from fetchChat', err);
    }
  }

  disconnect() {
    this.peer.disconnect();
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

  async callPeer() { 
    const peer = this.peer;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    try {
      let getOtherPeerId = await this.socket.emit('getOtherPeerId', this.props.roomId);
      let videoCall = await navigator.getUserMedia({video: true, audio: true}, (stream) => {
        const call = peer.call(this.state.otherPeerId, stream);
        call.on('stream', (remoteStream) => {
          let video = document.createElement('video');
          document.body.append(video);
          video.src = window.URL.createObjectURL(remoteStream);
          video.play();
        });
      }, (err) => {
        console.log('Failed to get local stream', err);
      });
    } catch(err) {
      console.log('err from callPeer', err)
    }
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
        <button id="call" onClick={() => this.callPeer()}>Call Peer</button>
        <button id="dc" onClick={() => this.disconnect()}>Disconnect</button>
      </div>
    );
  } 
}

export default Chat;