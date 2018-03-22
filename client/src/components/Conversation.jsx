import React, { Component } from 'react';

class Conversation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {}

  render() {
    return (
      <div>
        {this.props.messages.map(message => {
          return message.map(mess => {
            let id = mess.conversation_id;
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

export default Conversation;
