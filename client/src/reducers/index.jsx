import { combineReducers } from 'redux';

// import all individual reducers
import UserReducer from './reducer-users.jsx';
import ActiveUserReducer from './reducer-active-user.jsx';

export default combineReducers({
  users: UserReducer,
  activeUser: ActiveUserReducer,
});

// reducers take in actions and update part of application's state, sends to store
// reducers determine how actions will change the application..."smart"