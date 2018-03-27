export default function currentType(state = null, action) {
  switch (action.type) {
    case 'UPDATE_TYPE':
      return action.payload;
    case 'REMOVE_TYPE':
      return (state.currentUser = action.payload);
    default:
      return state;
  }
  return state;
};