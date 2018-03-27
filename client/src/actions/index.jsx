// const selectUser = (user) => {
//   console.log('you clicked on user', user.first);
//   return {
//     type: 'USER_SELECTED',
//     payload: user,
//   };
// };

// export default selectUser;

const actions = {
  updateUser: user => ({type: 'UPDATE_USER', payload: user}),
  removeUser: () => ({type: 'REMOVE_USER', payload: null}),
  updateToken: token => ({type: 'UPDATE_TOKEN', payload: token}),
  removeToken: () => ({type: 'REMOVE_TOKEN', payload: null}),
  updateId: id => ({type: 'UPDATE_ID', payload: id}),
  removeId: () => ({type: 'REMOVE_ID', payload: null}),
  updateType: type => ({type:'UPDATE_TYPE', payload: type}),
  removeType: () => ({type: 'REMOVE_TYPE', payload: null})

}

export default actions;

// action creator function returns action
// action: type and payload
// state is read-only...must DISPATCH action to change state