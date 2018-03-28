import React, { Component } from 'react';
import axios from 'axios';
import Button from 'material-ui/Button';
import Popup from "reactjs-popup";
import styled from 'styled-components';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Login from './Login.jsx';
import Grid from './Grid.jsx'
import { Switch, Route, Link } from 'react-router-dom';

const StyleButton = styled(Button)`
width: 25%;
`;

const StyledDiv = styled.div`
margin-top: 20%;
margin-left: 40%;
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
        let data = await axios.post(process.env.REST_PATH + '/auth/signup', {
          username: this.state.username,
          password: this.state.password
        });
        if (data) {
          this.props.history.push('/login');
        }
      } catch (error) {
        console.log('error with signup', error);
        return;
      }
    };

    this.handleChange = (e,name) => {
      this.setState({ [name]: e.target.value });
    };
  }
  render() {
    return (
      <StyledDiv>
        <h1>CraftMe</h1>
        <FormControl>
        <InputLabel >USERNAME</InputLabel>
        <Input type='text' value={this.state.username} onChange={e => this.handleChange(e,"username")} />
        </FormControl>
        <div> </div>
        <FormControl>
        <InputLabel >PASSWORD</InputLabel>
        <Input type="password" value={this.state.password} onChange={e => this.handleChange(e,"password")} />
        </FormControl>
        <div> </div>
        <FormControl>
        <InputLabel >RENTER PASSWORD</InputLabel>
        <Input type="password" value={this.state.password2} onChange={e => this.handleChange(e,"password2")} />
        </FormControl>
        <p><StyleButton variant="raised" onClick={this.signup}>SIGNUP</StyleButton></p>
        <p><Link to="/login">LOGIN</Link></p>
      </StyledDiv>
    );
  }
}
