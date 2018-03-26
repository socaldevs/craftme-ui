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
//import Feedback from './Feedback.jsx';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from './Grid.jsx';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
import axios from 'axios';
import Search from './Search.jsx';
import ReactModal from 'react-modal';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    //console.log(process.env.REST_PATH)
    return (
<<<<<<< HEAD
    <div >
=======
      <div className={this.state}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper className={this.state}>
              <Button
                aria-owns={anchorEl ? 'simple-menu' : null}
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
                <MenuItem onClick={this.handleClose}>
                  <Link to="/login">Login</Link>
                </MenuItem>
                <MenuItem onClick={this.handleClose}>
                  <Link to="/signup">Signup</Link>
                </MenuItem>
                <MenuItem onClick={this.handleClose}>
                  <Link to="/chatrooms">ChatRooms</Link>
                </MenuItem>
                <MenuItem onClick={this.handleClose}>
                  <Link to="/lessons">Lessons</Link>
                </MenuItem>
                <MenuItem onClick={() => this.handleLogoutClick()}>
                  Logout
                </MenuItem>
                <MenuItem onClick={this.handleClose}>
                  <Link to="/feedback">Feedback</Link>
                </MenuItem>
              </Menu>
              <Switch>
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route
                  path="/chatrooms"
                  component={ChatRoomList}
                  // component={props => (
                  //   <Protected component={ChatRoomList} {...props} />
                />
                <Route
                  path="/messages"
                  component={props => (
                    <Protected component={Messages} {...props} />
                  )}
                />
                <Route
                  path="/lessons"
                  component={props => (
                    <Protected component={Lessons} {...props} />
                  )}
                />
                <Route
                  path="/feedback"
                  component={props => (
                    <Protected component={Feedback} {...props} />
                  )}
                />
              </Switch>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}
App.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(App);

{
  /* <header>
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
>>>>>>> [components] added LanguageSelector.jsx and TextToTranslate.jsx
  <Switch>
  <Route path="/messages" component={props => (<Protected component={Messages} {...props} />)}/>
  <Route path="/lessons" component={props => (<Protected component={Lessons} {...props} />)}/>
  <Route path="/feedback" component={props => (<Protected component={Feedback} {...props} />)}/>
  <Route path="/chatrooms" component={ChatRoomList} />
  <Route path="/messages" component={Messages} />
  <Route path="/search" component={Search} />
  <Route path="/grid" component={Grid} />
  <Route path="/signup" component={Signup} />
  <Route path="/" component={Login} />
  </Switch>
    </div>
    

    );
  }
}
export default App