import React, { Component } from 'react';
import styled from 'styled-components';
import Paper from 'material-ui/Paper';
import axios from 'axios';
import { getChatFromLesson } from '../apiCaller.js';
export default class Card extends Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  async clickHandler(){
    // parent component ( LessonsContainer ) reaction to the click
    const { reactToClick } = this.props;

    // upcoming lessons case
    // redirect to conference
    if (this.props.booking) {
      const { booking } = this.props;
      // at this case ( upcoming lessons ) redirect to conference and pass booking 
      this.props.history.push('/conference', { booking });
    } // past lessons case 
      // render chats and chatlog
      else if (this.props.pastLesson) {
      try {
        const { chat_id } = this.props.pastLesson;
        const { messages } = await getChatFromLesson(chat_id);
        reactToClick(messages);
      } catch (error) {
        console.error('Error with rendering pastLessons', error);
        return;
      }
    }
  }
  

  render() {
    const { booking, pastLesson } = this.props;
    return (
      <Paper>
        <img src="" alt=""/>
        <h3>{( booking && booking.title ) || ( pastLesson && pastLesson.title ) || 'no title'}</h3>
        <p> { pastLesson && pastLesson.notes } </p>
        <button type="button" onClick={this.clickHandler}>Button</button>
      </Paper>
    )
  }
};