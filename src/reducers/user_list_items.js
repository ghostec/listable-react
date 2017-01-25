import Immutable from 'immutable';

const initialState = Immutable.Map();

export default (state = initialState, action) => {
  switch (action.type) {
    case 'USER_LIST_ITEMS/FROM_LIST':
      return state.set(action.list_id, action.user_list_items);
    case 'USER_LIST_ITEMS/CREATE':
      return state.setIn([action.user_list_item.get('_listId'), action.user_list_item.get('_listItemId')], action.user_list_item);
    case 'USER_LIST_ITEMS/PATCH':
      return state.setIn([action.user_list_item.get('_listId'), action.user_list_item.get('_listItemId')], action.user_list_item);
    default:
      return state;
  }
};
