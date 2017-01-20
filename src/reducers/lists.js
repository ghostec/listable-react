import Immutable from 'immutable';

const initialState = Immutable.fromJS({});

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LISTS/INDEX':
      return action.lists;
    case 'LISTS/CREATE':
      return state.set(action.list.get('_id'), action.list);
    default:
      return state;
  }
};

