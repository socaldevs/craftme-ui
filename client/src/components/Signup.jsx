import React, { Component } from 'react';
import axios from 'axios';
import Button from 'material-ui/Button';
import Popup from "reactjs-popup";
import styled from 'styled-components';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Login from './Login.jsx';
import { Switch, Route, Link } from 'react-router-dom';

const StyleButton = styled(Button)`
width: auto;
padding: 10px 5px;
`;

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      password2: ''
    };

    this.signup = async () => {
      try {
        let data = await axios.post('http://localhost:3000/auth/signup', {
          username: this.state.username,
          password: this.state.password
        });
        console.log(data);
        window.location='/login'
      } catch (error) {
        console.log('error with signup', error);
        return;
      }
    };

    this.handleChange = (e, type) => {
      this.setState({ [type]: e.target.value });
    };
  }
  render() {
    return (
      <div>
        <FormControl>
        <InputLabel htmlFor="name-simple">USERNAME</InputLabel>
        <Input type='text' value={this.state.username} onChange={e => this.handleChange(e,"username")} />
        </FormControl>
        <br />
        <FormControl>
        <InputLabel htmlFor="name-simple">PASSWORD</InputLabel>
        <Input type="password" value={this.state.password} onChange={e => this.handleChange(e,"password")} />
        </FormControl>
          <FormControl>
          <InputLabel htmlFor="name-simple">RENTER</InputLabel>
          <Input type="password" value={this.state.password2} onChange={e => this.handleChange(e,"password2")} />
        </FormControl>
        
        <p>
          <StyleButton variant="raised" onClick={this.signup}>
            SIGNUP 
          </StyleButton></p>
          <p><Link to="/login">LOGIN</Link></p>
      </div>
    );
  }
}

{/* <Popup trigger={
<form action="/login" method="get">
<StyleButton variant="raised" onClick={this.login}>
              Sign Up 
</StyleButton></form>
} position="right center">
<div>YOU HAVE SIGNED UP</div>
</Popup> */}