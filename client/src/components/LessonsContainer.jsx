import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import Icon from 'material-ui/Icon';
import PersonIcon from 'material-ui-icons/Person';
import SchoolIcon from 'material-ui-icons/School';
import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import Card from './Card.jsx';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
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
      chats: []
    }
    this.changeView = this.changeView.bind(this);
    this.renderUpcomingLessons = this.renderUpcomingLessons.bind(this);
    this.renderPastLessons = this.renderPastLessons.bind(this);
    this.switchChat = this.switchChat.bind(this);
  }
  
  switchChat(chats) {
    this.setState({chats});
    console.log('chats are: ', chats);
  }
  changeView(event, value) {
    console.log(value);
    this.setState({ navbarValue: value });
  };

  renderUpcomingLessons() {
    let bookings = this.state.upcomingBookings || [];
    console.log('props from conatiner', this.props);
    return (
      bookings.map((booking)=>{
        return <Card key={booking.id} booking={booking} history={this.props.history}centered />;
      })
    );
  }

  renderPastLessons() {
    let pastLessons = this.state.pastLessons || [];
    return (
      <div>
      {pastLessons.map((pastLesson)=>{
        return (
          <div> 
            <Card key={pastLesson.id} 
            reactToClick={this.switchChat} 
            pastLesson={pastLesson} centered />
           
          </div>
        )
      })
      }
        <div> {
          this.state.chats.map((chat, i) => {
            return ( 
              <p key={i}> {chat.handle} : {chat.message} </p>
            )
          })
        } 
      </div>
    </div>
    );
  }

  componentDidMount() {

    console.log('currentId  ====>', this.props.currentId);
    console.log('currentType  ====>', this.props.currentType);

    const getBookings = async () => {
      console.log('currentId  ====>', this.props.currentId);
      console.log('currentType  ====>', this.props.currentType);
      
      const userId = {teacher_id: 1};
      // if(type === 0){
      //   userId['teacher_id'] = this.props.currentId;    
      // } else if (type === 1){
      //   userId['student_id'] = this.props.currentId;    
      // }
      const upcomingBookings = await fetchUserUpcomingBookings(userId);
      this.setState({ upcomingBookings });  
    };

    const getLessons = async () => {
      // console.log('currentId  ====>', this.props.currentId);
      // console.log('currentType  ====>', this.props.currentType);
      const {currentId} = this.props;
      const pastLessons = await getUserPastLessons(currentId);
      console.log('weird dude', pastLessons);
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
      <Grid container spacing={24}>  
        <Grid item xs={12}>
            <Tabs value={this.state.navbarValue} onChange={this.changeView}
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
    ) 
  }
}

LessonsContainer.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(LessonsContainer)