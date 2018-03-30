export default function currentUrl(state = null, action) {
  switch (action.type) {
    case 'UPDATE_URL':
      return action.payload;
    case 'REMOVE_URL':
      return (state.currentUrl = action.payload);
    default:
      return state;
  }
  return state;
};