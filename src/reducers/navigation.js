import Immutable from 'immutable'

const initialState = Immutable.Map({
  location: undefined,
  history: Immutable.Stack()
});

export default (state = initialState, action) => {
  switch (action.type) {
    case 'NAVIGATION/NAVIGATE':
      return state
        .update('history', stack => {
          const location = state.get('location', undefined);
          return (location == undefined ? stack : stack.push(location));
        })
        .set('location', action.location);
    case 'NAVIGATION/BACK':
      return state
        .set('location', state.get('history').peek())
        .update('history', stack => stack.pop());
    default:
      return state;
  }
};
