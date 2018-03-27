import { combineReducers } from 'redux';

// import all individual reducers
// import UserReducer from './reducer-users.jsx';
// import ActiveUserReducer from './reducer-active-user.jsx';
import currentId from './currentId.jsx';
import currentToken from './currentToken.jsx';
import currentType from './currentType.jsx';
import currentUser from './currentUser.jsx';

export default combineReducers({
  currentId,
  currentToken,
  currentType,
  currentUser
});

// reducers take in actions and update part of application's state, sends to store
// reducers determine how actions will change the` application..."smart"`