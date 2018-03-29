export default function currentId(state = null, action) {
  switch (action.type) {
    case 'UPDATE_ID':
      return action.payload;
    case 'REMOVE_ID':
      return null;
    default:
      return state;
  }
  return state;
};