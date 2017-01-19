import Immutable from 'immutable'

const initialState = Immutable.fromJS({
  location: null
});

export default (state = initialState, action) => {
  switch (action.type) {
    case 'NAVIGATION/COMPLETE':
      return state.set('location', action.location);
    default:
      return state;
  }
};
