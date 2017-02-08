import { createSelector } from 'reselect';
import Immutable from 'immutable';

import { getResourceId } from './navigation';
import { getUserId, includeOwner } from './session'

export const getList = state => {
  const id = getResourceId(state);
  const list = state.lists && state.lists.get(id);
  return list && includeOwner(state, list.toJS());
}

export const getListSize = state => {
  const id = getResourceId(state);
  const list_items = state.list_items.get(id);
  return list_items && list_items.size;
}

export const getLists = (state, user_id) => {
  if(!user_id) user_id = getUserId(state);

  const user_lists = state.user_lists && state.user_lists.get(user_id, Immutable.List()).toJS();

  const lists = user_lists.map(list_id => state.lists.get(list_id).toJS());

  return lists.sort((a, b) => (a.sort_date < b.sort_date ? 1 : -1));
}
