import React, { Component } from 'react';
import axios from 'axios';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.signup = async () => {
      try {
        let data = await axios.post('http://localhost:3000/auth/signup', {
          username: this.state.username,
          password: this.state.password
        });
        console.log(data);
      } catch (error) {
        console.log('error with signup', error);
        return;
      }
    };

    this.handleChange = e => {
      this.setState({ [e.target.name]: e.target.value });
    };
  }
  render() {
    return (
      <div>
        Username:{' '}
        <input
          type="text"
          name="username"
          value={this.state.username}
          onChange={e => this.handleChange(e)}
        />
        <br />
        Password:{' '}
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={e => this.handleChange(e)}
        />
        <button onClick={this.signup}> Signup </button>
      </div>
    );
  }
}
