import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import selectUser from '../actions/index.jsx'; 

class UserList extends Component {
  createListItems() {
    return this.props.users.map((user, i) => {
      return (
        <li key={user.id} onClick={() => this.props.selectUser(user)}>
          {user.first}
        </li>
      );
    });
  }
  render() {
    return (
      <ul>
        {this.createListItems()}
      </ul>
    );
  }
}
// takes app store, passes it in to component as prop
const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ selectUser }, dispatch);
};

// return smart container vs. dumb component
export default connect(mapStateToProps, matchDispatchToProps)(UserList);