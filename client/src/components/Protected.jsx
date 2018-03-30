import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
import actions from '../actions/index.jsx';
import MenuNav from './Menu.jsx';

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
  removeUrl: () => dispatch(actions.removeUrl())
});

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  currentType: state.currentType,
  currentId: state.currentId,
  currentToken: state.currentToken,
  currentUrl: state.currentUrl
});

class ConnectedProtected extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    try {
      const { exp } = await jwtDecode(this.props.currentToken);
      console.log(exp);
      if (exp < 1) {
        this.props.history.push('/login');
      } 
    } catch (error) {
      console.log('Error with decoding token', error);
      this.props.history.push('/login');
      return;
    }
  }

  render() 
  {
    const { component: Component } = this.props;
  return (
  <div>
  <MenuNav key={1}{...this.props}  />
  <Component key={2}{...this.props} />

  </div>
  
  )}
}

const Protected = connect(mapStateToProps, mapDispatchToProps)(ConnectedProtected);

export default Protected;
