import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
import actions from '../actions/index.jsx';
import axios from 'axios';
import { Switch, Route, Link } from 'react-router-dom';

const mapDispatchToProps = dispatch => ({
  removeUser: () => dispatch(actions.removeUser()),
  removeToken: () => dispatch(actions.removeToken()),
  removeId: () => dispatch(actions.removeId()),
  removeType: () => dispatch(actions.removeType()),
  removeUrl: () => dispatch(actions.removeUrl()),
});

class ConnectedNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false,
    };

    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.renderImage = this.renderImage.bind(this);
  }


  async handleLogoutClick() {
    try {
      const data = await axios.get(`${process.env.REST_PATH}/auth/signout`);
      this.props.removeToken();
      this.props.removeUser();
      this.props.removeId();
      this.props.removeType();
      this.props.removeUrl();
      if (data) {
        this.props.history.push('/login');
      }
    } catch (error) {
      console.log('Error with logging out', error);
    }
  }

  renderImage() {
    this.setState({
      expand: !this.state.expand,
    });
  }

  render() {
    return (
      <nav className="navbar">
        <Link to="/profile" className="navbar-item" style={{ textDecoration: "none" }} onMouseEnter={this.renderImage} onMouseLeave={this.renderImage}>
          {this.state.expand === false ? <div> Welcome {this.props.currentUser}! </div> 
          : <img className="p-p" src={this.props.currentUrl || "https://goo.gl/Ra3EGA"}/>}
        </Link>
        <Link to="/search" className="navbar-item" style={{ textDecoration: 'none' }}> {this.props.currentType === 1 ? 'Search' : 'Add a craft'}</Link>
        {this.props.currentType === 1 ? null : <Link to="/calendar" className="navbar-item" style={{ textDecoration: 'none' }}> Calendar </Link>}
        <Link to="/lessons" className="navbar-item" style={{ textDecoration: 'none' }}>Lessons</Link>
        <Link to="/messages" className="navbar-item" style={{ textDecoration: 'none' }}>Messages</Link>
        <Link to="/search" className="navbar-item" style={{ textDecoration: 'none' }} onClick={this.handleLogoutClick}>Logout</Link>
      </nav>
    );
  }
}

const Navbar = connect(null, mapDispatchToProps)(ConnectedNavbar);

export default Navbar;
