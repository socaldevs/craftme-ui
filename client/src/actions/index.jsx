const selectUser = (user) => {
  console.log('you clicked on user', user.first);
  return {
    type: 'USER_SELECTED',
    payload: user,
  };
};

export default selectUser;

// action creator function returns action
// action: type and payload
// state is read-only...must DISPATCH action to change state