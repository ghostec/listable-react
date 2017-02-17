import Immutable from 'immutable';

const initialState = Immutable.Map();

export default (state = initialState, action) => {
  let current_list, new_list, index;
  switch (action.type) {
    case 'USER_LISTS/FETCH':
      return state.setIn([action.user_id, 'fetching'], true);
    case 'USER_LISTS/FETCH_DONE':
      return state.setIn([action.user_id, 'fetching'], false);
    case 'USER_LISTS/FROM_USER':
      return state.setIn([action.user_id, 'lists'], action.lists);
    case 'USER_LISTS/CREATE':
      current_list = state.getIn([action.user_id, 'lists'], Immutable.List());
      new_list = current_list.push(action.list_id);
      return state.setIn([action.user_id, 'lists'], new_list);
    case 'USER_LISTS/DELETE':
      current_list = state.get([action.user_id, 'lists'], Immutable.List());
      index = current_list.indexOf(action.list_id);
      new_list = index != -1 ? current_list.delete(index) : current_list;
      return state.setIn([action.user_id, 'lists'], new_list);
    default:
      return state;
  }
};
