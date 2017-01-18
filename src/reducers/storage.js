import Immutable from 'immutable';
import { REHYDRATE } from 'redux-persist/constants';

const initialState = Immutable.fromJS({
  rehydrated: false
});

const storage = (state = initialState, action) => {
  switch (action.type) {
    case REHYDRATE:
      return state.set('rehydrated', true);
    default:
      return state;
  }
}

export default storage;
