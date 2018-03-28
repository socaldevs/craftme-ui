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
import { connect } from 'react-redux';
import actions from '../actions/index.jsx';
import Card from './Card.jsx';


const mapDispatchToProps = dispatch => ({
  updateUser: user => dispatch(actions.updateUser(user)),
  removeUser: () => dispatch(actions.removeUser()),
  updateToken: token => dispatch(actions.updateToken(token)),
  removeToken: () => dispatch(actions.removeToken()),
  updateId: id => dispatch(actions.updateId(id)),
  removeId: () => dispatch(actions.removeId()),
  updateType: type => dispatch(actions.updateType(type)),
  removeType: () => dispatch(actions.removeType())
});

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  currentType: state.currentType,
  currentId: state.currentId,
  currentToken: state.currentToken
});

const StyleButton = styled(Button)`
width: 25%;
`;

const StyledDiv = styled.div`
margin-top: 20%;
margin-left: 40%;
`;

class ConnectedLogin extends Component {
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
          this.props.updateUser(data.data.username);
          this.props.updateId(data.data.id);
          this.props.updateToken(data.data.token);
          this.props.updateType(data.data.type);
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
    //console.log(process.env.REST_PATH +'/auth/login')
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

const Login = connect(mapStateToProps, mapDispatchToProps)(ConnectedLogin);
export default Login;


{/* <StyledPopup trigger={<StyleButton variant="raised" onClick={this.login}>Login </StyleButton>} position="right center">
<div>YOU HAVE LOGGED IN !!!</div>
</StyledPopup> */}