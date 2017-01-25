import Immutable from 'immutable';
import { REHYDRATE } from 'redux-persist/constants';

const initialState = Immutable.Map({
  rehydrated: false
});

export default (state = initialState, action) => {
  switch (action.type) {
    case REHYDRATE:
      return state.set('rehydrated', true);
    default:
      return state;
  }
};
