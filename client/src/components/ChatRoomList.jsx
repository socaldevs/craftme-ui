import React, { Component } from 'react';
import Chat from './Chat.jsx';
class ChatRoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room: null,
    }
  }

  setChatRoom(num) {
    this.setState({ room: num });
  }
  componentDidMount(){
    const { booking } = this.props.history.location.state;
    console.log('props from chat', this.props);
    console.log('this should be booking', booking);
  }

  render() {
    return (
      <div>
        Hello from ChatRoomList!
        <li><a href="#" onClick={() => {this.setChatRoom(1)}}>Chat Room 1</a></li>
        <li><a href="#" onClick={() => {this.setChatRoom(2)}}>Chat Room 2</a></li>
        <li><a href="#" onClick={() => {this.setChatRoom(3)}}>Chat Room 3</a></li>
        {this.state.room === null ? null : <Chat roomId={this.state.room}/>}
      </div>
    );
  }
};

export default ChatRoomList;