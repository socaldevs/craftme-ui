import React, { Component } from 'react';
import Conversation from './Conversation.jsx';

class ConversationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messagePerson: [],
      lastMessage: ''
    };
    this.setUserName = this.setUserName.bind(this);
  }

  setUserName() {
    let user = localStorage.getItem('username');
    let storage = [];
    let messages = this.props.messages;
    for (let i = 0; i < messages.length; i++) {
      for (let j = 0; j < messages[i].length; j++) {
        if (
          messages[i][j].sender_id !== user &&
          !storage.includes(messages[i][j].sender_id)
        ) {
          storage.push(messages[i][j].sender_id);
        }
      }
    }
    this.setState({
      messagePerson: storage
    });
  }

  expand() {}

  componentWillMount() {
    this.setUserName();
  }

  render() {
    return (
      <div>
        <Conversation
          messages={this.props.messages}
          people={this.state.messagePerson}
        />
      </div>
    );
  }
}

export default ConversationList;
