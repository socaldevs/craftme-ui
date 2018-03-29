import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import Card from './Card.jsx';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import { fetchRemoteTeachersForCraft } from '../apiCaller.js';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 3,
  },
});


class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navbarValue: 'remote',
      remoteTeachers: [],
      inPersonTeachers: [],
    }
    this.changeView = this.changeView.bind(this);
    this.renderRemoteTeachers = this.renderRemoteTeachers.bind(this);
    this.renderInPersonTeachers = this.renderInPersonTeachers.bind(this);
  }

  changeView(event, value) {
    console.log(value);
    this.setState({ navbarValue: value });
  };

  renderRemoteTeachers(){
    const remoteTeachers = this.state.remoteTeachers || [];
    console.log('props from conatiner', this.props);
    return (
      remoteTeachers.map((teacher)=>{
        return <Card key={teacher.id} teacher={teacher} history={this.props.history}centered />;
      })
    );
  }

  renderInPersonTeachers(){
    const inPersonTeachers = this.state.inPersonTeachers || [];
    return (
      // inPersonTeachers.map((inPersonTeacher)=>{
      //   return <Card key={inPersonTeacher.id} inPersonTeacher={inPersonTeacher} centered />;
      // })
      <p>Placeholder for in person teachers</p>  
    );
  }

  componentDidMount(){

    console.log('currentId  ====>', this.props.currentId);
    console.log('currentType  ====>', this.props.currentType);

    const getRemotes = async () => {
      console.log('currentId  ====>', this.props.currentId);
      console.log('currentType  ====>', this.props.currentType);
      
      const  craft_id = 1 ;

      const remoteTeachers = await fetchRemoteTeachersForCraft(craft_id);
      
      this.setState({ remoteTeachers });  
    };

    const getInPersons = async () => {
      // console.log('currentId  ====>', this.props.currentId);
      // console.log('currentType  ====>', this.props.currentType);
      // const {currentId} = this.props;
      // const pastLessons = await getUserPastLessons(currentId);
      // console.log('weird dude', pastLessons);
      // this.setState({ pastLessons });  
    };

    getRemotes();
    // getInPersons();
    // console.log('lessons from the state',this.state.inPersonTeachers);
    
  }

  render(){
    return(
      <Grid container spacing={24}>  
        <Grid item xs={12}>
            <Tabs value={this.state.navbarValue} onChange={this.changeView}
              indicatorColor="primary" textColor="primary" centered >
              <Tab label="Remote" value="remote"/>
              <Tab label="In Person" value="inPerson"/>
            </Tabs>
        </Grid>
        <Grid item xs={12}>
          {
            this.state.navbarValue === 'remote' ?
            this.renderRemoteTeachers() : this.renderInPersonTeachers()
          } 
        </Grid>              
    </Grid>
    ) 
  }
}

SearchResults.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(SearchResults)