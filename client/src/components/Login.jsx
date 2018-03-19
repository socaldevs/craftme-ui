import React, { Component } from "react";
import axios from "axios";

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
          <button onClick={this.login}>Login </button>
        </form>
      </div>
    );
  }
}
