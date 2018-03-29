export default function currentToken(state = null, action) {
  switch (action.type) {
    case 'UPDATE_TOKEN':
      return action.payload;
    case 'REMOVE_TOKEN':
      return null;
    default:
      return state;
  }
  return state;
};