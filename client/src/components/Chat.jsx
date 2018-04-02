import React, { Component } from 'react';
import io from 'socket.io-client/dist/socket.io.js';
import axios from 'axios';
import Peer from 'simple-peer';
import TextToTranslate from './TextToTranslate.jsx';
import LanguageSelector from './LanguageSelector.jsx';

class Chat extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      message: '',
      messages: [],
      feedback: '',
      translateFrom: '',
      translateTo: '',
      // peerId: '',
      // otherPeerId: '',
    }
    this.username = this.props.currentUser;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
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

    this.socket.on('offer', (offer) => {
      this.peer.signal(JSON.parse(offer));
    });
    // this.socket.on('getOtherPeerId', (data) => {
    //   this.socket.emit('fetchedPeerId', {
    //     peerId: this.state.peerId,
    //     room: this.props.roomId,
    //   });
    // });
    // this.socket.on('fetchedPeerId', (data) => {
    //   this.setState({ otherPeerId: data });
    // });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.roomId !== nextProps.roomId) { 
      this.socket.emit('exit', this.props.roomId);
      this.socket.emit('room', nextProps.roomId);
      this.setState({ messages: [], feedback: '' });
    }
    navigator.getUserMedia({ video: true, audio: false }, (stream) => {
      this.peer = new Peer({
        initiator: false, //who is the first peer?
        trickle: false,
        stream: stream
      });
      this.peer.on('signal', (data) => {
        this.socket.emit('answer', {
          room: this.props.roomId,
          answer: JSON.stringify(data),
        });
      });
      this.peer.on('stream', (stream) => {
        let video = document.createElement('video');
        this.videoContainer.append(video);
        video.src = window.URL.createObjectURL(stream);
        video.play();
      })
    }, (err) => console.log('err', err));
    // this.peer = new Peer({ key: process.env.PEERKEY });
    // this.peer.on('open', (id) => {
    //   this.setState({ peerId: id });
    // });
    // this.peer.on('call', (call) => {
    //   navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    //   navigator.getUserMedia({video: true, audio: true}, (stream) => {
    //     call.answer(stream); 
    //     call.on('stream', (remoteStream) => {
    //       let video = document.createElement('video');
    //       this.videoContainer.append(video);
    //       video.src = window.URL.createObjectURL(remoteStream);
    //       video.play();
    //     });
    //     this.socket.on('endCall', () => {
    //       call.close();
    //     })
    //   }, (err) => {
    //     console.log('Failed to get local stream', err);
    //   });
    // });
    
  }

  componentWillUnmount() {
    // this.videoContainer.innerHTML = '';
    this.peer.destroy();
  }

  
  setText(e) {
    this.setState({ message: e.target.value });
    this.socket.emit('typing', {
      room: this.props.roomId,
      feedback: `${this.username} is typing...`,
    });
  }

  async saveChat () {
    const { messages } = this.state;
    const { teacher_id, student_id, roomId, title } = this.props
    try {
      const {data} = await axios.post(`${process.env.REST_PATH}/user/saveLesson/`, { 
        messages,
        teacher_id,
        student_id,
        title,
        roomId,
      });
      if (data) { 
        this.props.history.push('/feedback', data);
      }
    } catch(err) {
      console.log('err from saveChat', err);
    }
  }

  sendChat() {
    this.socket.emit('chat', {
      room: this.props.roomId,
      handle: this.username,
      message: this.state.message,
    });
    this.setState({ message: '' });
  }

  callPeer() {
    navigator.getUserMedia({ video: true, audio: false }, (stream) => {
      this.peer = new Peer({
        initiator: true, 
        trickle: false,
        stream: stream,
      });
      this.peer.on('signal', (data) => {
        this.socket.emit('offer', {
          room: this.props.roomId,
          offer: JSON.stringify(data),
        })
      });
      this.socket.on('answer', (answer) => {
        this.peer.signal(JSON.parse(answer))
      });
      this.peer.on('connect', () => console.log('PEER CONNECTED'))
      this.peer.on('stream', (stream) => {
        let video = document.createElement('video');
        this.videoContainer.append(video);
        video.src = window.URL.createObjectURL(stream);
        video.play();
      });
    }, (err) => console.log('err', err));
  }

  // async callPeer() { 
  //   const peer = this.peer;
  //   navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  //   try {
  //     let getOtherPeerId = await this.socket.emit('getOtherPeerId', this.props.roomId);
  //     let videoCall = await navigator.getUserMedia({video: true, audio: true}, (stream) => {
  //       this.call = peer.call(this.state.otherPeerId, stream);
  //       this.call.on('stream', (remoteStream) => {
  //         let video = document.createElement('video');
  //         this.videoContainer.append(video);
  //         video.src = window.URL.createObjectURL(remoteStream);
  //         video.play();
  //       });
  //       this.socket.on('endCall', () => {
  //         this.call.close();
  //         //stream.stop();
  //       })
  //     }, (err) => {
  //       console.log('Failed to get local stream', err);
  //     });
  //   } catch(err) {
  //     console.log('err from callPeer', err);
  //   }
  // }

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

