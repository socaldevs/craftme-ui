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
    console.log(process.env.REST_PATH)
    return (
    <div >
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