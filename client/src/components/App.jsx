import React, { Component } from 'react';
import UserList from '../containers/user-list.jsx';
import UserDetail from '../containers/user-detail.jsx';
import { Switch, Route, Link } from 'react-router-dom';
import Protected from './Protected.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
<<<<<<< HEAD
import ChatRoomList from './ChatRoomList.jsx';
=======
import Lessons from './Lessons.jsx';
import Messages from './Messages.jsx';
>>>>>>> [Components] - commit for rebase

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
<<<<<<< HEAD
            <Link to="/chatrooms">ChatRooms</Link>
=======
            <Link to="/user/messages">Messages</Link>
          </li>
          <li>
            <Link to="/user/lessons">Lessons</Link>
>>>>>>> [Components] - commit for rebase
          </li>
        </ul>
        <div>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
<<<<<<< HEAD
<<<<<<< HEAD
            <Route path="/chatrooms" component={ChatRoomList} />
=======
            <Route path="/user/lessons" component={Lessons} />
            <Route path="/user/messages" component={Messages} />
>>>>>>> [Components] - commit for rebase
=======
            <Route
              path="/user/lessons"
              component={props => <Protected component={Lessons} {...props} />}
            />
            <Route
              path="/user/messages"
              component={props => <Protected component={Messages} {...props} />}
            />
>>>>>>> [Rebase] - commit for rebase
          </Switch>
        </div>
        <div>
          
        </div>
      </header>
    );
  }
}

