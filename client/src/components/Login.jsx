import React, { Component } from "react";
import axios from "axios";
import RaisedButton from 'material-ui/RaisedButton';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.login = () => {};
  }
  render() {
    return (
      <div>
        <form>
          Username: <input type="text" />
          <br />
          Password: <input type="text" />
          <RaisedButton onClick={this.login}>Login </RaisedButton>
        </form>
      </div>
    );
  }
}
