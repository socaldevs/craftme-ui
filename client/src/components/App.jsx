import React from 'react';

import UserList from '../containers/user-list.jsx';
import UserDetail from '../containers/user-detail.jsx';

const App = () => (
  <div>
      <h2>User List</h2>
      <UserList />
      <hr />
      <h2>User Details</h2>
      <UserDetail />
  </div>
);

export default App;


