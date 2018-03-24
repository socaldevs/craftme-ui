import React, { Component } from 'react';
import axios from 'axios';
import Button from 'material-ui/Button';
import Popup from "reactjs-popup";
import styled from 'styled-components';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Signup from './Signup.jsx';
import Grid from './Grid.jsx'
import { Switch, Route, Link } from 'react-router-dom';




// const StyledPopup = styled(Popup)`
// font-size: 30px;
// width: 200%;
// padding: 20px 10px;
// `;
const StyleButton = styled(Button)`
width: 25%;
`;

const StyledDiv = styled.div`
margin-top: 20%;
margin-left: 40%;
`;

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isLoggedIn: false
    };

    this.login = async () => {
      try {
        let data = await axios.post(process.env.REST_PATH +'/auth/login', {
          username: this.state.username,
          password: this.state.password
        });
        if (data) {
          localStorage.setItem('token', data.data.token);
          localStorage.setItem('username', data.data.username);
          localStorage.setItem('user_id', data.data.id);
          this.props.history.push('/search');
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
    this.check = () => {
      const isLoggedIn = props.isLoggedIn;
      if (isLoggedIn) {
        return <Grid />;
      }
      return <h1> </h1>;
    }
  }

  render() {
    //console.log("HI", process.env.PATH)
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
        <p><StyleButton variant="raised" onClick={this.login}>LOGIN </StyleButton></p>
        <p><Link to="/signup">SIGNUP</Link></p>
      </StyledDiv>
    );
  }
}

{/* <StyledPopup trigger={<StyleButton variant="raised" onClick={this.login}>Login </StyleButton>} position="right center">
<div>YOU HAVE LOGGED IN !!!</div>
</StyledPopup> */}