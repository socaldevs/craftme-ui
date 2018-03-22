import React, { Component } from 'react';
import axios from 'axios';
import Button from 'material-ui/Button';
import Popup from "reactjs-popup";
import styled from 'styled-components';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';


const StyledPopup = styled(Popup)`
font-size: 30px;
width: 200%;
padding: 20px 10px;
`;

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
          localStorage.setItem('user_id', data.data.id);
        }
        console.log(data);
      } catch (error) {
        console.log('error with login', error);
        return;
      }
    };

    this.handleChange = (e,name) => {
      this.setState({ [name]: e.target.value });
    };
  }
  render() {
    return (
      <div>
        <FormControl>
        <InputLabel htmlFor="name-simple">Username</InputLabel>
        <Input id="name-simple" value={this.state.username} onChange={e => this.handleChange(e,"username")} />
        </FormControl>
        <br />
        <FormControl>
        <InputLabel htmlFor="name-simple">Password</InputLabel>
        <Input type="password" value={this.state.password} onChange={e => this.handleChange(e,"password")} />
        </FormControl>
        <StyledPopup trigger={<Button variant="raised" onClick={this.login}>Login </Button>} position="right center">
    <div>YOU HAVE LOGGED IN !!!</div>
  </StyledPopup>
      </div>
    );
  }
}
