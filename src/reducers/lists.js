import Immutable from 'immutable';

const initialState = Immutable.Map();

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LISTS/BATCH':
      return state.merge(action.lists);
    case 'LISTS/CREATE':
      return state.set(action.list.get('_id'), action.list);
    case 'LISTS/GET':
      return state.set(action.list.get('_id'), action.list);
    case 'LISTS/PATCH':
      return state.set(action.list.get('_id'), action.list);
    case 'LISTS/DELETE':
      return state.delete(action.list.get('_id'));
    default:
      return state;
  }
};
