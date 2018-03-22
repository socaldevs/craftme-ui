import React, { Component } from 'react';

class ConversationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messagePerson: [],
      lastMessage: ''
    };
    this.setUserName = this.setUserName.bind(this);
  }

  //TODO: debug, this is not working
  setUserName(messagePerson) {
    let user = localStorage.getItem('username');
    let storage = [];
    for (let i = 0; i < this.props.messages.length; i++) {
      for (let j = 0; j < this.props.messages[i].length; j++) {
        console.log('inside setUserName');
        if (
          this.props.messages[i][j].sender_id !== user &&
          !storage.includes(this.props.messages[i][j].sender_id)
        ) {
          storage.push(this.props.messages[i][j].sender_id);
        }
      }
    }
    this.setState({
      messagePerson: storage
    });
  }

  //TODO: debug, this is not working
  //trying to create an array with every person conversation exists
  componentDidMount() {
    this.setUserName();
  }

  render() {
    return (
      <div>
        {this.props.messages.map(message => {
          return message.map(mess => {
            return (
              <div>
                {mess.sender_id} : {mess.text}
              </div>
            );
          });
        })}
      </div>
    );
  }
}

export default ConversationList;
