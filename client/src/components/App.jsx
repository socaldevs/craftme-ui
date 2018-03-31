import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Protected from './Protected.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Messages from './Messages.jsx';
import Feedback from './Feedback.jsx';
import Grid from './Grid.jsx';
import Search from './Search.jsx';
import LessonsContainer from './LessonsContainer.jsx';
import Conference from './Conference.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div >
        <Switch>
          <Route path="/messages" component={props => (<Protected component={Messages} {...props} />)} />
          <Route path="/lessons" component={props => (<Protected component={LessonsContainer} {...props} />)} />
          <Route path="/feedback" component={props => (<Protected component={Feedback} {...props} />)} />
          <Route path="/messages" component={props => (<Protected component={Messages} {...props} />)} />
          <Route path="/search" component={props => (<Protected component={Search} {...props} />)} />
          <Route path="/conference" component={props => (<Protected component={Conference} {...props} />)} />
          <Route path="/grid" component={Grid} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/" component={props => (<Protected component={Search} {...props} />)} />
        </Switch>
      </div>


    );
  }
}
export default App;
