import Immutable from 'immutable';

const initialState = Immutable.Map();

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LIST_ITEMS/FROM_LIST':
      return action.list_items;
    case 'LIST_ITEMS/CREATE':
      return state.set(action.list_item.get('_id'), action.list_item);
    case 'LIST_ITEMS/PATCH':
      return state.set(action.list_item.get('_id'), action.list_item);
    case 'LIST_ITEMS/DELETE':
      return state.delete(action.list_item.get('_id'));
    default:
      return state;
  }
};

