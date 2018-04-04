import React, { Component } from 'react';
import axios from 'axios';
import ConversationList from './ConversationList.jsx';
import { fetchAllConversationsById } from '../apiCaller.js';
export default class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: [],
    };
    this.updateConvo = this.updateConvo.bind(this);
    this.grabConversations = this.grabConversations.bind(this);
  }

  async componentDidMount() {
    await this.grabConversations()
  }
  
  async updateConvo(convo) {
    // this.setState({conversations: [...this.state.conversations, convo]});
    await this.grabConversations();
  }

  async grabConversations() {
    try {
      const id = this.props.currentId;
      const { data } = await fetchAllConversationsById(id);
      this.setState({ conversations: data });
    } catch (error) {
      console.log('Error with fetchAllMessages on front end', error);
      return;
    }
  }

  render() {
    return (
      <div>
        <ConversationList {...this.props} updateConvo={this.updateConvo} conversations={this.state.conversations} />
      </div>
    );
  }
}
