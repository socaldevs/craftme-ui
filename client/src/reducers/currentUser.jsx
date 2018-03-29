export default function currentUser(state = null, action) {
  switch (action.type) {
    case 'UPDATE_USER':
      return action.payload;
    case 'REMOVE_USER':
      return null;
    default:
      return state;
  }
  return state;
};