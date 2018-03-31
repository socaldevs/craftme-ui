import React, {Component} from 'react';
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

  this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  async handleLogoutClick() {
    try {
      let data = await axios.get(process.env.REST_PATH +'/auth/signout');
      this.props.history.push('/login');
      this.props.removeToken();
      this.props.removeUser();
      this.props.removeId();
      this.props.removeType();
      this.props.history.push('/login');
    } catch (error) {
      console.log('Error with logging out', error);
      return;
    }
  }


  render() {
    return (
      <ul className="navbar">
        <Link to="#" className="item">Welcome {this.props.currentUser}! </Link>
        <Link to="#" className="item"> Image goes here {this.props.currentUrl} </Link>
        <Link to="/search" className="item">Search</Link>
        <Link to="/lessons" className="item">Lessons</Link>
        <Link to="/messages" className="item">Messages</Link>
        {/* <a href="/login" className="item" onClick={this.handleLogoutClick}> Logout </a> */}
        <Link to="/search" className="item" onClick={this.handleLogoutClick}>Logout</Link>
      </ul>
    )
  }
}

const Navbar = connect(null, mapDispatchToProps)(ConnectedNavbar);

export default Navbar;
