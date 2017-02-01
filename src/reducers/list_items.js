import Immutable from 'immutable';

const initialState = Immutable.Map();

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LIST_ITEMS/FROM_LIST':
      return state.set(action.list_id, action.list_items);
    case 'LIST_ITEMS/CREATE':
      const list_item = action.list_item.get('list_item');
      return state.setIn([list_item.get('_listId'), list_item.get('_id')], list_item);
    case 'LIST_ITEMS/PATCH':
      return state.setIn([action.list_item.get('_listId'), action.list_item.get('_id')], action.list_item);
    case 'LIST_ITEMS/DELETE':
      return state.deleteIn([action.list_item.get('_listId'), action.list_item.get('_id')]);
    default:
      return state;
  }
};

