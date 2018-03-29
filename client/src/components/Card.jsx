import React, { Component } from 'react';
import styled from 'styled-components';
import Paper from 'material-ui/Paper';
import axios from 'axios';
import {getChatFromLesson} from '../apiCaller.js';
export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: [],
    }
    this.clickHandler = this.clickHandler.bind(this);
  }

  async clickHandler(e){
    
    const { booking } = this.props;
    // passing the booking to the chatrooms component
    if (this.props.booking) {
      this.props.history.push('/conference', { booking });
    }
    if (this.props.pastLesson) {
      if (this.state.chats.length === 0) {
        try {
          const {chat_id} = this.props.pastLesson;
          let {messages} = await getChatFromLesson(chat_id);
          this.setState({
            chats: messages
          })
        } catch (error) {
          console.log('Error with rendering pastLessons', error);
          return;
        }
      } else {
        this.setState({
          chats: []
        });
      }
    }
  }
  

  render() {
    return (
      <Paper>
        <img src="" alt=""/>
        {this.props.booking ? <h3>{this.props.booking && this.props.booking.title} title</h3>
        : 
        <div>{this.props.pastLesson && this.props.pastLesson.notes}
          <div className="c2"> 
            {this.state.chats.length > 0 ? this.state.chats.map((chat, i) => {
            return <div key={i}> {chat.handle} : {chat.message} </div> }) : null}
          </div>
        </div>
        }
        
        
        <button type="button" onClick={this.clickHandler}>Button</button>
      </Paper>
    )
  }
};