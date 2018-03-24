import { Component } from 'react';
import React from 'react';
import UserList from '../containers/user-list.jsx';
import UserDetail from '../containers/user-detail.jsx';
import { Switch, Route, Link } from 'react-router-dom';
import Protected from './Protected.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import ChatRoomList from './ChatRoomList.jsx';
import Lessons from './Lessons.jsx';
import Messages from './Messages.jsx';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
//TEST
import TestTranslate from './TestTranslate.jsx';
//TEST

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    };
    this.handleClick = this.handleClick.bind(this)
    this.handleClose= this.handleClose.bind(this)
  }
  handleClick(event){
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose(){
    this.setState({ anchorEl: null });
  };

  render() {
    const anchorEl  = this.state.anchorEl;
    return (
      <div className={this.state}>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Paper className={this.state}>
          <Button
          aria-owns={anchorEl ? "simple-menu" : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          Open Menu
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}><Link to="/login">Login</Link></MenuItem>
          <MenuItem onClick={this.handleClose}><Link to="/signup">Signup</Link></MenuItem>
          <MenuItem onClick={this.handleClose}><Link to="/chatrooms">ChatRooms</Link></MenuItem>
          <MenuItem onClick={this.handleClose}><Link to="/testtranslate">Test Translate Component </Link></MenuItem>

        </Menu>
        <Switch>
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/chatrooms" component={ChatRoomList} />
    <Route path="/testtranslate" component={TestTranslate} />

  </Switch>
          
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={this.state}>xs=12 sm=6</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={this.state}>xs=12 sm=6</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={this.state}>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={this.state}>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={this.state}>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={this.state}>xs=6 sm=3</Paper>
        </Grid>
      </Grid>
    </div>

    );
  }
}
App.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(App)


{/* <header>
<ul>
  <li>
    <Link to="/login">Login</Link>
  </li>
  <li>
    <Link to="/signup">Signup</Link>
  </li>
  <li>
    <Link to="/chatrooms">ChatRooms</Link>
  </li>
</ul>
<div>
  <Switch>
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/chatrooms" component={ChatRoomList} />
  </Switch>
</div>
<div>
  
</div>
</header> */}
