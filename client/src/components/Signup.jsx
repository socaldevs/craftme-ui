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
import FeedbackAlert from './FeedbackAlert.jsx';
import { displayNotification } from '../apiCaller.js';

const StyleButton = styled(Button)`
width: 15%;
`;

const StyledDiv = styled.div`
text-align: center;
`;


const styles = theme => ({
  root: {
    backgroundColor: 'lightgray',
    width: '15%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '1em',
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
  selected: {
    paddingTop: 6,
    color: '#333333',
  }
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
      profile: 'http://www.planystech.com/wp-content/uploads/2017/03/profile-placeholder.jpg',
      file: null,
      alertMessage: '',
      alertVisibility: 'hidden-element',
      alertType: '',
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
    const reader = new FileReader();
    const coming = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        profile: reader.result,
        file: coming,
      });
    };
    reader.readAsDataURL(coming);
  }


  async signUp() {
    try {
      const type = (this.state.value === 'teacher') ? 0 : 1;
      const active = (this.state.file) ? this.state.file : '';


      const formData = new FormData();
      formData.append('profile_pic', active);
      formData.append('username', this.state.username);
      formData.append('password', this.state.password);
      formData.append('bio', this.state.bio);
      formData.append('type', type);
      const data = await axios.post(`${process.env.REST_PATH}/auth/signup`, formData);
      if (data) {
        this.props.history.push('/login');
      }
    } catch (error) {
      // render failure feedback
      await displayNotification(
        this, 2000,
        {
          alertMessage: 'Username already exists or connection error!',
          alertType: 'alert-danger',
        },
      );

      console.log('error with signup', error);
    }
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <div>
        <FeedbackAlert
          alertVisibility={this.state.alertVisibility}
          alertType={this.state.alertType}
          alertMessage={this.state.alertMessage}
        />
        <StyledDiv>
          <h1 id="app-title">CraftMe</h1>

          {/* <Avatar
            src={this.state.profile}

          /> */}
          {/* <img
            src={this.state.profile}
            className="avatar"
            alt="avatar placeholder"
          />
          <div>
            <form>
              <input type="file" onChange={this.urlInput} />
            </form>
          </div> */}
          <form className="profile-picture-form" method="put" encType="multipart/form-data">
            <label className="upload-profile-picture" >
              <img className="img-thumbnail image" alt="avatar" src={this.state.profile} />
              <input hidden type="file" id="profile-picture-upload" name="file" onChange={this.urlInput} multiple />
              <div className="middle">
                <div className="text">Upload</div>
              </div>
            </label>
            <button type="button" onClick={this.updateProfilePicture} className="button">Submit</button>
          </form>
          <FormControl>
            <InputLabel >Username</InputLabel>
            <Input type="text" value={this.state.username} onChange={e => this.handleChange(e, 'username')} />
          </FormControl>
          <div />
          <FormControl>
            <InputLabel >Password</InputLabel>
            <Input type="password" value={this.state.password} onChange={e => this.handleChange(e, 'password')} />
          </FormControl>
          <div />
          <FormControl>
            <InputLabel >Biography</InputLabel>
            <Input type="text" value={this.state.bio} onChange={e => this.handleChange(e, 'bio')} />
          </FormControl>

          <div>
            <BottomNavigation value={value} onChange={this.handleChangeButton} className={classes.root}>
              <BottomNavigationAction label="Student" value="student" className={classes.selected} icon={<PersonIcon />} />
              <BottomNavigationAction label="Teacher" value="teacher" className={classes.selected} icon={<SchoolIcon />} />
            </BottomNavigation>
          </div>

          <p><StyleButton variant="raised" onClick={this.signUp}>SIGNUP</StyleButton></p>

          <p><Link to="/login">Login</Link></p>
        </StyledDiv>
      </div>
    );
  }
}


export default withStyles(styles)(Signup);
