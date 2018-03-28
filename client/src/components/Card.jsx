import React, { Component } from 'react';
import styled from 'styled-components';
import Paper from 'material-ui/Paper';
export default class Card extends Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(){
    
    const { booking } = this.props;
    // passing the booking to the chatrooms component
    console.log('this.props', this.props.history);
    this.props.history.push('/conference', { booking });
  }

  // async grabLessons(e) {
  //   try {
  //     let id = e.target.getAttribute('data-id');
  //     let chat = await axios.get(
  //       process.env.REST_PATH +`/user/fetchMongoChatById/${id}`
  //     );
  //     this.setState({ chats: chat.data });
  //   } catch (error) {
  //     console.log('Error with grabLessons', error);
  //     return;
  //   }
  // }

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