import React, { Component } from 'react';
import axios from 'axios';
import Button from 'material-ui/Button';
import styled from 'styled-components';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import actions from '../actions/index.jsx';


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
    };
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async login() {
    try {
      const data = await axios.post(`${process.env.REST_PATH} '/auth/login`, {
        username: this.state.username,
        password: this.state.password,
      });
      if (data) {
        
        console.log("data: ", data);

        this.props.updateUser(data.data.username);
        this.props.updateId(data.data.id);
        this.props.updateToken(data.data.token);
        this.props.updateType(data.data.type);
        this.props.updateUrl(data.data.profile_pic_url);
        this.props.history.push('/search');
      }
    } catch (error) {
      console.log('error with login', error);
    }
  }

  handleChange(e, name) {
    this.setState({ [name]: e.target.value });
  }

  render() {
    return (
      <StyledDiv>
        <h1>CraftMe</h1>
        <FormControl>
          <InputLabel >USERNAME</InputLabel>
          <Input type='text' value={this.state.username} onChange={e => this.handleChange(e, "username")} />
        </FormControl>
        <div> </div>
        <FormControl>
          <InputLabel >PASSWORD</InputLabel>
          <Input type="password" value={this.state.password} onChange={e => this.handleChange(e, "password")} />
        </FormControl>
        <p><StyleButton variant="raised" onClick={this.login}>LOGIN </StyleButton></p>
        <p><Link to="/signup">SIGNUP</Link></p>
      </StyledDiv>
    );
  }
}

const Login = connect(mapStateToProps, mapDispatchToProps)(ConnectedLogin);

export default Login;
