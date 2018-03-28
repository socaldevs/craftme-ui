import React, { Component } from 'react';
import styled from 'styled-components';
import Paper from 'material-ui/Paper';
export default class Card extends Component {
  constructor(props) {
    super(props);
    // this.state = {
      
    // };
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(){
    
    const { booking } = this.props;
    // passing the booking to the chatrooms component
    this.props.history.push('/chatrooms', { booking });
  }

  render() {
    return (
      <Paper>
        <img src="" alt=""/>
        <h3>{this.props.booking && this.props.booking.title} title</h3>
        <p>{this.props.pastLesson && this.props.pastLesson.notes}</p>
        <button type="button" onClick={this.clickHandler}>Button</button>
      </Paper>
    )
  }
};