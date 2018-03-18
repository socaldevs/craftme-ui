import React, { Component } from 'react';
import UserList from '../containers/user-list.jsx';
import UserDetail from '../containers/user-detail.jsx';
<<<<<<< HEAD
import { Switch, Route, Link } from 'react-router-dom';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
=======
import Chat from './Chat.jsx';
import ChatRoomList from './ChatRoomList.jsx';

const App = () => (
  <div>
      <h2>User List</h2>
      <UserList />
      <hr />
      <h2>User Details</h2>
      <UserDetail />
      <hr />
      <ChatRoomList />
  </div>
);
>>>>>>> [rooms] made room list, click to enter, dynamic room id passed through props, lifecycle timings

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
        </ul>
        <div>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        </div>
      </header>
    );
  }
}

export default App;
