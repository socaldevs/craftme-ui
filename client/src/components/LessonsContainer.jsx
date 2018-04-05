import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Tabs, { Tab } from 'material-ui/Tabs';
import Grid from 'material-ui/Grid';
import Card from './Card.jsx';
import EmptyContent from './EmptyContent.jsx';

import { fetchUserUpcomingBookings, getUserPastLessons } from '../apiCaller.js';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 3,
  },
});


class LessonsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navbarValue: 'upcoming',
      upcomingBookings: [],
      pastLessons: [],
      chats: [],
    };
    this.changeView = this.changeView.bind(this);
    this.renderUpcomingLessons = this.renderUpcomingLessons.bind(this);
    this.renderPastLessons = this.renderPastLessons.bind(this);
    this.switchChat = this.switchChat.bind(this);
  }

  switchChat(chats) {
    this.setState({ chats });
    console.log('chats are: ', chats);
  }
  changeView(event, value) {
    console.log(value);
    this.setState({ navbarValue: value });
  }

  renderUpcomingLessons() {
    let bookings = this.state.upcomingBookings || [];
    console.log('props from conatiner', this.props);
    return (
      bookings.length > 0 ? 
      bookings.map((booking)=>{
        return <Grid item md={12}> <Card key={booking.id} booking={booking} buttonName="Start Lesson" 
          history={this.props.history} centered /> </Grid>;
      })
      : <EmptyContent warningMessage="You have no upcoming lessons!"/>
    );
  }

  renderPastLessons() {
    const pastLessons = this.state.pastLessons || [];
    return (
      <div>
        { 
          pastLessons.length > 0 ?
          <div>  
            {
              pastLessons.map((pastLesson) => {
                return (
                  <div>
                    <Card 
                      key={pastLesson.id}
                      buttonName="View Chat"
                      reactToClick={this.switchChat}
                      pastLesson={pastLesson}
                      centered
                    />
                  </div>
                );
              })
            }
           {
            this.state.chats.map((chat, i) => {
              return (
                <p key={i}> {chat.handle} : {chat.message} </p>
              );
            })
          } 
        </div>
        
        : <EmptyContent warningMessage="You have no past lessons!" />
      }
    </div>
    );
  }

  componentDidMount() {
    //gettng the upcoming lessons for the logged in user
    const { currentId } = this.props;
    // const userId = {teacher_id: 1};    
    const getBookings = async () => {
      
      // const userId = {teacher_id: 1};
      // if(type === 0){
      //   userId['teacher_id'] = this.props.currentId;    
      // } else if (type === 1){
      //   userId['student_id'] = this.props.currentId;    
      // }
      const upcomingBookings = await fetchUserUpcomingBookings(currentId);
      this.setState({ upcomingBookings });  
    };

    const getLessons = async () => {
      
      const pastLessons = await getUserPastLessons(currentId);
      this.setState({ pastLessons });  
    };

    getBookings();
    getLessons();
    console.log('lessons from the state',this.state.pastLessons);
    
  }

  render() {
    let viewController = {
      upcoming: this.renderUpcomingLessons,
      past: this.renderPastLessons
      // chats: this.renderChats
    }
    return (
      <div className="container lessonsContainer">            
        <Grid container spacing={24}>  
          <Grid item xs={12}>
              <Tabs className="innerNav" value={this.state.navbarValue} onChange={this.changeView}
                indicatorColor="primary" textColor="primary" centered >
                <Tab label="upcoming" value="upcoming"/>
                <Tab label="Past" value="past"/>
              </Tabs>
          </Grid>
          <Grid item xs={12}>
            {
              viewController[this.state.navbarValue]()
            } 
          </Grid>              
      </Grid>
    </div>
    ) 
  }
}

LessonsContainer.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(LessonsContainer)