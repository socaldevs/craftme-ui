import React, { Component } from 'react';
import { FormControl } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import axios from 'axios';
import { fetchUserInfo, updateUserInfo } from '../apiCaller.js';
import Popup from './Popup.jsx';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bio: '',
      showPopup: false,
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getProfileInfo = this.getProfileInfo.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
  }

  
  async componentDidMount() {
    await this.getProfileInfo();
  }
  
  handleInputChange(e, name) {
    this.setState({ [name]: e.target.value });
  }

  async getProfileInfo() {
    try {
      const user = await fetchUserInfo(this.props.currentId);
      console.log(user);
    } catch (error) {
      console.log('Error with getProfileInfo', error);
      return;
    }
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  async updateInfo() {
    try {
      const updatedInfo = await updateUserInfo(this.state.bio, this.props.currentId);
      if (updatedInfo) {
        this.setState({
          bio: '',
        })
        await this.togglePopup();
      }
    } catch (error) {
      console.log('Error with updateInfo', error);
      return;
    }
  }

  render() {
    return (
      <div className="profile">
        <h1 className="profile-h1"> Edit {this.props.currentUser}'s information  </h1>
        <br/>
        <FormControl className="profile-line">
          <InputLabel >Bio</InputLabel>
          <Input type='text' value={this.state.bio} onChange={e => this.handleInputChange(e, "bio")} />
        </FormControl>
        <br/>
        <button onClick={this.updateInfo} className="profile-button"> Submit </button>
        {
        this.state.showPopup ? 
          <Popup
          text={`Information updated!`}
          closePopup={this.togglePopup}
          />
        : null
        }
      </div>
    )
  }
}

export default Profile;