import Immutable from 'immutable';

const initialState = Immutable.Map();

export default (state = initialState, action) => {
  let current_list, new_list, index;
  switch (action.type) {
    case 'USER_LISTS/FROM_USER':
      return state.set(action.user_id, action.lists);
    case 'USER_LISTS/CREATE':
      current_list = state.get(action.user_id, Immutable.List());
      new_list = current_list.push(action.list_id);
      return state.set(action.user_id, new_list);
    case 'USER_LISTS/REMOVE':
      current_list = state.get(action.user_id, Immutable.List());
      index = current_list.indexOf(action.list_id);
      new_list = index != -1 ? current_list.delete(index) : current_list;
      return state.set(action.user_id, new_list);
    default:
      return state;
  }
};
