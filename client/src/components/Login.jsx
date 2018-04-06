import React, { Component } from 'react';
import axios from 'axios';
import Button from 'material-ui/Button';
import styled from 'styled-components';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import actions from '../actions/index.jsx';
import FeedbackAlert from './FeedbackAlert.jsx';
import { displayNotification } from '../apiCaller.js';


const mapDispatchToProps = dispatch => ({
  updateUser: user => dispatch(actions.updateUser(user)),
  removeUser: () => dispatch(actions.removeUser()),
  updateToken: token => dispatch(actions.updateToken(token)),
  removeToken: () => dispatch(actions.removeToken()),
  updateId: id => dispatch(actions.updateId(id)),
  removeId: () => dispatch(actions.removeId()),
  updateType: type => dispatch(actions.updateType(type)),
  removeType: () => dispatch(actions.removeType()),
  updateUrl: url => dispatch(actions.updateUrl(url)),
  removeUrl: () => dispatch(actions.removeUrl()),
});

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  currentType: state.currentType,
  currentId: state.currentId,
  currentToken: state.currentToken,
  currentUrl: state.currentUrl,
});

const StyleButton = styled(Button)`
width: 15%;
`;

const StyledDiv = styled.div`
padding-top: 10%;
text-align: center;
`;

class ConnectedLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      alertMessage: '',
      alertVisibility: 'hidden-element',
      alertType: '',
    };
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async login() {
    try {
      const data = await axios.post(`${process.env.REST_PATH}/auth/login`, {
        username: this.state.username,
        password: this.state.password,
      });
      if (data) {

        this.props.updateUser(data.data.username);
        this.props.updateId(data.data.id);
        this.props.updateToken(data.data.token);
        this.props.updateType(data.data.type);
        this.props.updateUrl(data.data.profile_pic_url);
        this.props.history.push('/search');
      }
    } catch (error) {
      // render failure feedback
      await displayNotification(
        this, 2000,
        {
          alertMessage: 'Invalid username or password!',
          alertType: 'alert-danger',
        },
      );
      console.log('error with login', error);
    }
  }

  handleChange(e, name) {
    this.setState({ [name]: e.target.value });
  }

  render() {
    return (
      <div>
        <FeedbackAlert
          alertVisibility={this.state.alertVisibility}
          alertType={this.state.alertType}
          alertMessage={this.state.alertMessage}
        />
        <StyledDiv>
          <h1>CraftMe</h1>
          <FormControl>
            <InputLabel >Username</InputLabel>
            <Input type="text" value={this.state.username} onChange={e => this.handleChange(e, 'username')} />
          </FormControl>
          <div />
          <FormControl>
            <InputLabel >Password</InputLabel>
            <Input type="password" value={this.state.password} onChange={e => this.handleChange(e, 'password')} />
          </FormControl>
          <p><StyleButton variant="raised" onClick={this.login}>LOGIN </StyleButton></p>
          <p><Link to="/signup">Signup</Link></p>
        </StyledDiv>
      </div>

    );
  }
}

const Login = connect(mapStateToProps, mapDispatchToProps)(ConnectedLogin);

export default Login;
