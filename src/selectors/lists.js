import { createSelector } from 'reselect';
import Immutable from 'immutable';

import { getResourceId } from './navigation';
import { getUserId, includeOwner } from './session'
import { getUserLists } from './user_lists';

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

  const user_lists = getUserLists(state, user_id);

  const lists = user_lists.lists && user_lists.lists.map(list_id => {
    return state.lists.get(list_id) && state.lists.get(list_id).toJS();
  }).filter(list => !!list);

  if(user_lists.fetching == false && !lists) return [];

  return lists && lists.sort((a, b) => (a.sort_date < b.sort_date ? 1 : -1));
}

export const isSaved = state => {
  const user_id = getUserId(state);
  const list_id = getResourceId(state);
  const user_lists = getUserLists(state, user_id);

  console.log(user_lists);

  if(user_lists.fetching && !user_lists.lists) return false;

  return user_lists.lists && !!user_lists.lists.find(el => el == list_id);
}
