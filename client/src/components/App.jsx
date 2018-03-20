import React, { Component } from 'react';
import UserList from '../containers/user-list.jsx';
import UserDetail from '../containers/user-detail.jsx';
import { Switch, Route, Link } from 'react-router-dom';
import Protected from './Protected.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import ChatRoomList from './ChatRoomList.jsx';
import Lessons from './Lessons.jsx';
import Messages from './Messages.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <header>
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
          <li>
            <Link to="/messages">Messages</Link>
          </li>
          <li>
            <Link to="/lessons">Lessons</Link>
          </li>
        </ul>
        <div>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route
              path="/chatrooms"
              component={props => (
                <Protected component={ChatRoomList} {...props} />
              )}
            />
            <Route
              path="/messages"
              component={props => <Protected component={Messages} {...props} />}
            />
            <Route
              path="/lessons"
              component={props => <Protected component={Lessons} {...props} />}
            />
          </Switch>
        </div>
        <div />
      </header>
    );
  }
}
