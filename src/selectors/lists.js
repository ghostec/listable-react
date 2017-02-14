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

  const user_lists_imm = state.user_lists && state.user_lists.get(user_id, undefined);
  const user_lists = user_lists_imm && user_lists_imm.toJS();

  const lists = user_lists && user_lists.map(list_id => {
    return state.lists.get(list_id) && state.lists.get(list_id).toJS();
  }).filter(list => !!list);

  return lists && lists.sort((a, b) => (a.sort_date < b.sort_date ? 1 : -1));
}

export const isSaved = state => {
  const user_id = getUserId(state);
  const list_id = getResourceId(state);

  return !!state.user_lists.get(user_id).find(el => el == list_id);
}
