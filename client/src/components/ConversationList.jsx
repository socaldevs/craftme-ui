import React, { Component } from 'react';
import axios from 'axios';

class ConversationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversation: [],
    };
    this.grabConversations = this.grabConversations.bind(this);
  }

  async grabConversations(e) {
    try {
      const id = parseInt(e.target.getAttribute('data-id'));
      const conversations = await axios.get(
        process.env.REST_PATH + `/user/messages/fetchAllMessagesByConversationId/${id}`
      );
      this.setState({ conversation: conversations.data });
    } catch (error) {
      console.log('Error with grabConversations', error);
      return;
    }
  }

  render() {
    return (
      <div>
        <div className="wrapper">
          {this.props.conversations.map((conversation, i) => {
            return (
                <div 
                  className="c1"
                  data-id={conversation.id}
                  onClick={e => this.grabConversations(e)}
                  key={i}
                >
                  View your conversation with: 
                  {conversation.sender !== this.props.props.currentUser 
                    ? conversation.sender : 
                    conversation.recipient}
                </div>
            )}
          )}
          <br />
          <div className="c2">
            {this.state.conversation
              ? this.state.conversation.map((conv, i) => {
                  return (
                    <div key={i}>
                      {conv.sender} : {conv.text}
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    );
  }
}

export default ConversationList;
