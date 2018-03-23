import { Component } from 'react';
import React from 'react';
import UserList from '../containers/user-list.jsx';
import UserDetail from '../containers/user-detail.jsx';
import { Switch, Route, Link } from 'react-router-dom';
import Protected from './Protected.jsx';
import Login from './Login.jsx';
import Messages from './Messages.jsx';
import Signup from './Signup.jsx';
import ChatRoomList from './ChatRoomList.jsx';
import Lessons from './Lessons.jsx';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
import ReactModal from 'react-modal';
import Calender from './Calender.jsx';

const customStyles = {  //for relocating modal
  content : {
    //top                   : '50%',
    //left                  : '50%',
    //right                 : 'auto',
    //bottom                : 'auto',
    //marginRight           : '-50%',
    //transform             : 'translate(-50%, -50%)'
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      showModal: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose= this.handleClose.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  handleClick(event){
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose(){
    this.setState({ anchorEl: null });
  };

  handleOpenModal () {
    this.setState({ showModal: true });
  };
  
  handleCloseModal () {
    this.setState({ showModal: false });
  };

  render() {
    const anchorEl  = this.state.anchorEl;
    return (
      <div >
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Paper >
          <Button variant="raised"
          aria-owns={anchorEl ? "simple-menu" : null}
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
          <MenuItem onClick={this.handleClose}><Link to="/login">Login</Link></MenuItem>
          <MenuItem onClick={this.handleClose}><Link to="/signup">Signup</Link></MenuItem>
          <MenuItem onClick={this.handleClose}><Link to="/chatrooms">ChatRooms</Link></MenuItem>
          <MenuItem onClick={this.handleClose}><Link to="/messages">Messages</Link></MenuItem>
        </Menu>
          
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper >xs=12 sm=6</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper >
          <Button variant="raised" onClick={this.handleOpenModal}>Trigger Modal</Button>
        <ReactModal 
           isOpen={this.state.showModal}
           contentLabel="Minimal Modal Example"
           style={customStyles}
           ariaHideApp={false}
        >
        <Calender/>
          <Button variant="raised" onClick={this.handleCloseModal}>Close Modal</Button>
        </ReactModal>

          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper >xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper >xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper >xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper >xs=6 sm=3</Paper>
        </Grid>
      </Grid>
    </div>

    );
  }
}
export default App


{/* <header>
<ul>
  <li>
    <Link to="/login">Login</Link>
  </li>
  <li>
    <Link to="/signup">Signup</Link>
  </li>
  <li>
    <Link to="/chatrooms">ChatRooms</Link>
  </li>
</ul>
<div>
  <Switch>
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/chatrooms" component={ChatRoomList} />
  </Switch>
</div>
<div>
  
</div>
</header> */}
