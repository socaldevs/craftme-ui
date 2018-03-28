import React, { Component } from 'react';
import io from 'socket.io-client/dist/socket.io.js';
import axios from 'axios';
import TextToTranslate from './TextToTranslate.jsx';
import LanguageSelector from './LanguageSelector.jsx';

class Chat extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      message: '',
      messages: [],
      feedback: '',
      peerId: '',
      otherPeerId: '',
      translateFrom: '',
      translateTo: '',
    }
    this.username = this.props.currentUser;
    this.selectLanguage = this.selectLanguage.bind(this);
  }
  componentDidMount() { 
    this.socket = io(`${process.env.SOCKET_PATH}/`);
    this.socket.on('connect', () => {
      this.socket.emit('room', this.props.roomId);
    });
    this.socket.on('confirmation', (data) => {
      console.log('message from server:', data)
      if (this.state.messages.length !== 0) {
        this.socket.emit('renderChat', {
          messages: this.state.messages,
          room: this.props.roomId,
        });
      } 
    });
    this.socket.on('renderChat', (data) => {
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
      this.setState({ messages: [], feedback: '' });
    }
    this.peer = new Peer({ key: process.env.PEERKEY });
    this.peer.on('open', (id) => {
      this.setState({ peerId: id });
    });
    this.peer.on('call', (call) => {
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
      navigator.getUserMedia({video: true, audio: true}, (stream) => {
        call.answer(stream); 
        call.on('stream', (remoteStream) => {
          let video = document.createElement('video');
          this.videoContainer.append(video);
          video.src = window.URL.createObjectURL(remoteStream);
          video.play();
        });
        this.socket.on('endCall', () => {
          call.close();
        })
      }, (err) => {
        console.log('Failed to get local stream', err);
      });
    });
    this.videoContainer.innerHTML = '';
  }

  async saveChat () {
    const { messages } = this.state;
    const { teacherId, studentId } = this.props
    try {
      const data = await axios.post(`${process.env.SOCKET_PATH}/chat/save/`, { 
        messages,
        teacherId,
        studentId,
      });
    } catch(err) {
      console.log('err from saveChat', err);
    }
  }

  setText(e) {
    this.setState({ message: e.target.value });
    this.socket.emit('typing', {
      room: this.props.roomId,
      feedback: `${this.username} is typing...`,
    });
  }

  sendChat() {
    this.socket.emit('chat', {
      room: this.props.roomId,
      handle: this.username,
      message: this.state.message
    });
    this.setState({ message: '' });
  }

  async callPeer() { 
    const peer = this.peer;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    try {
      let getOtherPeerId = await this.socket.emit('getOtherPeerId', this.props.roomId);
      let videoCall = await navigator.getUserMedia({video: true, audio: true}, (stream) => {
        this.call = peer.call(this.state.otherPeerId, stream);
        this.call.on('stream', (remoteStream) => {
          let video = document.createElement('video');
          this.videoContainer.append(video);
          video.src = window.URL.createObjectURL(remoteStream);
          video.play();
        });
        this.socket.on('endCall', () => {
          this.call.close();
          //stream.stop();
        })
      }, (err) => {
        console.log('Failed to get local stream', err);
      });
    } catch(err) {
      console.log('err from callPeer', err);
    }
  }

  selectLanguage(e){
    e.target.className === 'from' ? 
    this.setState({ translateFrom: e.target.value }) :
    this.setState({ translateTo: e.target.value })
  }

  render() {
    return (
      <div>
        <div className="video-container" ref={(input) => { this.videoContainer = input; }} />
        <br />
        <LanguageSelector 
          selectLanguage={this.selectLanguage.bind(this)} 
          translateFrom={this.state.translateFrom}
          translateTo={this.state.translateTo}
        />
        <div className="chat-window">
          <div className="output">
            {this.state.messages.map((data,i) => {
              return <TextToTranslate 
                handle={data.handle} 
                message={data.message} 
                translateFrom={this.state.translateFrom}
                translateTo={this.state.translateTo}
                key={i} 
              />
            })}
          </div>
          <div className="feedback">{this.state.feedback}</div>
        </div>
          <div className="message-container">
            <input className="message" type="text" placeholder="Message" value={this.state.message} onChange={e => this.setText(e)}/>
            <button className="send" onClick={() => this.sendChat()}>SEND</button>
          </div>
        <button className="save" onClick={() => this.saveChat()}>SAVE CHAT</button>
        <button className="call" className="glyphicon glyphicon-facetime-video" onClick={() => this.callPeer()} />
      </div>
    );
  }
}

export default Chat;