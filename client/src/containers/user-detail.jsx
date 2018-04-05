import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserDetail extends Component {
  render() {
    if (!this.props.user) {
      return <h3>Select a User...</h3>;
    }
    return (
      <div>
        <h2>{this.props.user.first}</h2>
        <h2>{this.props.user.age}</h2>
        <img src={this.props.user.thumbnail} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.activeUser,
});

export default connect(mapStateToProps)(UserDetail);
