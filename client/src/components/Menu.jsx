import React from 'react';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Menu, { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import styled from 'styled-components';
import Button from 'material-ui/Button';
import { Switch, Route, Link } from 'react-router-dom';
import actions from '../actions/index.jsx';
import { connect } from 'react-redux';


const mapDispatchToProps = dispatch => ({
  removeUser: () => dispatch(actions.removeUser()),
  removeToken: () => dispatch(actions.removeToken()),
  removeId: () => dispatch(actions.removeId()),
  removeType: () => dispatch(actions.removeType())
});
import Avatar from "material-ui/Avatar";
import PropTypes from 'prop-types';
import classNames from "classnames";

const StyleButton = styled(Button)`
width: 25%;
`;

const MenuDiv = styled.div`
margin-left: 85%;
`;
const StyledDiv = styled.div`
margin-left: 40%;
margin-right: 40%;
`;

const styles = theme => ({
  container: {
    flexGrow: 1,
    position: 'relative',
    height: 250,
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  avatar: {
    margin: 10
  },
  bigAvatar: {
    width: 60,
    height: 60
  }
});

class ConnectedMenuNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      anchorEl: null,
      anchorElUser: null,
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleClickUser = this.handleClickUser.bind(this);
    this.handleClose= this.handleClose.bind(this);
    this.handleCloseUser= this.handleCloseUser.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);

/////HERE
    console.log("my info: ", this.props )

    
  }
  handleClick(event){
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClickUser(event){
    this.setState({ anchorElUser: event.currentTarget });
  };

  handleClose(){
    this.setState({ anchorEl: null });
  };
  handleCloseUser(){
    this.setState({ anchorElUser: null });
  };


  async handleLogoutClick() {
    try {
      let data = await axios.get(process.env.REST_PATH +'/auth/signout');
      this.props.history.push('/login');
      this.props.removeToken();
      this.props.removeUser();
      this.props.removeId();
      this.props.removeType();
    } catch (error) {
      console.log('Error with logging out', error);
      return;
    }
  }

  render() {
    const anchorEl  = this.state.anchorEl;
    const anchorElUser  = this.state.anchorElUser;
    const { classes } = this.props;
      return (
          <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
          <Paper >
            <Button
                aria-owns={anchorElUser ? 'simple-menu-User' : null}
                aria-haspopup="true"
                onClick={this.handleClickUser}
              >
                WELCOME! {this.props.currentUser}
              </Button>
              <Menu
                id="simple-menu-User"
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={this.handleCloseUser}
              >
                        <Avatar src={this.props.currentUrl} className={classNames(classes.avatar)}/>

                <MenuItem onClick={() => this.handleLogoutClick()}>
                  Logout
                </MenuItem>
                <MenuItem onClick={this.handleCloseUser}>
                  Profile
                </MenuItem>
              </Menu>
          </Paper>
        </Grid>
          <Grid item xs={12} sm={6}>
          <Paper>
            <MenuDiv>
            <Button
                aria-owns={anchorEl ? 'simple-menu' : null}
                aria-haspopup="true"
                onClick={this.handleClick}
              >
                Open Menu
              </Button>
              
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>
                  <Link to="/lessons">Lessons</Link>
                </MenuItem>
                <MenuItem onClick={this.handleClose}>
                  <Link to="/messages">Messages</Link>
                </MenuItem>
              </Menu>
              </MenuDiv>

            </Paper>
          </Grid>
          </Grid>
      );
    }
}

ConnectedMenuNav.propTypes = {
  classes: PropTypes.object.isRequired
};
const MenuNav = connect(null, mapDispatchToProps)(ConnectedMenuNav);

export default withStyles(styles)(MenuNav);