export default function currentType(state = null, action) {
  switch (action.type) {
    case 'UPDATE_TYPE':
      return action.payload;
    case 'REMOVE_TYPE':
      return null;
    default:
      return state;
  }
  return state;
};