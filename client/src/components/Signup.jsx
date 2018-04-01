import React, { Component } from 'react';
import axios from 'axios';
import Button from 'material-ui/Button';
import styled from 'styled-components';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import PersonIcon from 'material-ui-icons/Person';
import SchoolIcon from 'material-ui-icons/School';
import Avatar from 'material-ui/Avatar';
import classNames from 'classnames';


const StyleButton = styled(Button)`
width: 24%;
`;

const StyledDiv = styled.div`
margin-top: 10%;
margin-left: 40%;
`;

const styles = theme => ({
  root: {
    width: 150,
  },
  row: {
    display: 'flex',
    justifyContent: 'center'
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
});

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      passwordTwo: '',
      bio: '',
      value: 'student',
<<<<<<< HEAD
      profile: 'http://www.planystech.com/wp-content/uploads/2017/03/profile-placeholder.jpg',
      file: null
=======
      profile: "http://www.planystech.com/wp-content/uploads/2017/03/profile-placeholder.jpg",
      file: null,
>>>>>>> [FLEXBOX] styled conference component
    };

    this.urlInput = this.urlInput.bind(this);
    this.signUp = this.signUp.bind(this);

    this.handleChange = (e, name) => {
      this.setState({ [name]: e.target.value });
    };
    this.handleChangeButton = (event, value) => {
      this.setState({ value });
    };
  }

  urlInput(event) {

    let reader = new FileReader();
    var coming = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        profile: reader.result,
        file: coming
      });
      console.log(this.state.file)
    }
    reader.readAsDataURL(coming)

  }


  async signUp() {
    try {
      let type = (this.state.value === 'teacher') ? 0 : 1;
      let active = (this.state.file) ? this.state.file : '';


      const formData = new FormData();
      formData.append('profile_pic', active);
      formData.append('username', this.state.username);
      formData.append('password', this.state.password);
      formData.append('bio', this.state.bio);
      formData.append('type', type);
<<<<<<< HEAD
      const data = await axios.post(`${process.env.REST_PATH}/auth/signup`, formData);
=======

      let data = await axios.post(process.env.REST_PATH + '/auth/signup', formData);
>>>>>>> [FLEXBOX] styled conference component
      if (data) {
        this.props.history.push('/login');
      }
      console.log(data);
    } catch (error) {
      console.log('error with signup', error);
    }
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <StyledDiv>
        <h1>CraftMe</h1>
        <Avatar
          src={this.state.profile}
          className={classNames(classes.avatar, classes.bigAvatar)}
        />
        <div>
          <form>
            <label>
              Display Photo:
              <input type="file" onChange={this.urlInput} />
            </label>
          </form>
        </div>
        <FormControl>
          <InputLabel >USERNAME</InputLabel>
          <Input type='text' value={this.state.username} onChange={e => this.handleChange(e, "username")} />
        </FormControl>
        <div> </div>
        <FormControl>
          <InputLabel >PASSWORD</InputLabel>
          <Input type="password" value={this.state.password} onChange={e => this.handleChange(e, "password")} />
        </FormControl>
        <div> </div>
        <FormControl>
          <InputLabel >RENTER PASSWORD</InputLabel>
          <Input type="password" value={this.state.passwordTwo} onChange={e => this.handleChange(e, "passwordTwo")} />
        </FormControl>
        <div> </div>
        <FormControl>
          <InputLabel >BIOGRAPHY</InputLabel>
          <Input type='text' value={this.state.bio} onChange={e => this.handleChange(e, "bio")} />
        </FormControl>
        
        <div>
          <BottomNavigation value={value} onChange={this.handleChangeButton} className={classes.root}>
            <BottomNavigationAction label="Student" value="student" icon={<PersonIcon />} />
            <BottomNavigationAction label="Teacher" value="teacher" icon={<SchoolIcon />} />
          </BottomNavigation>
        </div>

        <p><StyleButton variant="raised" onClick={this.signUp}>SIGNUP</StyleButton></p>

        <p><Link to="/login">Login</Link></p>
      </StyledDiv>
    );
  }
}


export default withStyles(styles)(Signup);