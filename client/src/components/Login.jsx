import React, { Component } from 'react';
import axios from 'axios';
import Button from 'material-ui/Button';


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.login = async () => {
      try {
        let data = await axios.post('http://localhost:3000/auth/login', {
          username: this.state.username,
          password: this.state.password
        });
        if (data) {
          localStorage.setItem('token', data.data.token);
          localStorage.setItem('username', data.data.username);
        }
        console.log(data);
      } catch (error) {
        console.log('error with login', error);
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
        <Button variant="raised" onClick={this.login}>Login </Button>
      </div>
    );
  }
}
