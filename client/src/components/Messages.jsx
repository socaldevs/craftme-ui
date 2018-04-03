import React, { Component } from 'react';
import axios from 'axios';
import ConversationList from './ConversationList.jsx';
export default class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: [],
    };
  }

  

  async componentDidMount() {
    try {
      const id = this.props.currentId;
      const data = await axios.get(
        process.env.REST_PATH +`/user/messages/fetchAllConversationsById/${id}`
      );
      this.setState({ conversations: data.data });
    } catch (error) {
      console.log('Error with fetchAllMessages on front end', error);
      return;
    }
  }

 

  render() {
    return (
      <div>
        <ConversationList props={this.props} conversations={this.state.conversations} />
      </div>
    );
  }
}
