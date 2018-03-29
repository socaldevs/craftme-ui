import React, { Component } from 'react';
import styled from 'styled-components';
import Paper from 'material-ui/Paper';
import axios from 'axios';
import {getChatFromLesson} from '../apiCaller.js';
export default class Card extends Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  async clickHandler(){
    const { reactToClick } = this.props;
    const { booking } = this.props;
    // passing the booking to the chatrooms component
    if (this.props.booking) {
      this.props.history.push('/conference', { booking });
    }
    if (this.props.pastLesson) {
      try {
        const {chat_id} = this.props.pastLesson;
        const {messages} = await getChatFromLesson(chat_id);
        reactToClick(messages);
      } catch (error) {
        console.log('Error with rendering pastLessons', error);
        return;
      }
    }
  }
  

  render() {
    return (
      <Paper>
        <img src="" alt=""/>
        {this.props.booking ? <h3>{this.props.booking && this.props.booking.title} title</h3>
        : 
        <div> {this.props.pastLesson && this.props.pastLesson.notes} </div>
        }
        <button type="button" onClick={this.clickHandler}>Button</button>
      </Paper>
    )
  }
};