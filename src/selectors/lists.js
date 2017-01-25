import { createSelector } from 'reselect';

import * as navigation from './navigation';
import * as session from './session';

export const getList = state => {
  const id = navigation.getResourceId(state);
  const list = state.lists && state.lists.get(id);
  return list && session.includeOwner(state, list.toJS());
}

export const getListSize = state => {
  return state.list_items.size;
}

export const getLists = state => {
  return state.lists && _.map(state.lists.toJS(), v => v).sort((a, b) => {
    return (a.last_seen_at < b.last_seen_at ? 1 : -1)
  });
}
