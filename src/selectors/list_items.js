import { createSelector } from 'reselect';

import * as navigation from './navigation';
import * as session from './session';

export const getListItems = state => {
  const list_id = navigation.getResourceId(state);
  const list_items = state.list_items &&
    state.list_items.get(list_id) &&
    state.list_items.get(list_id).toJS();
  const sorted = list_items && _.map(list_items, v => v).sort((a, b) => {
    return (a.updated_at < b.updated_at ? 1 : -1)
  });

  return sorted && sorted.map((v, k) => {
    return session.includeOwner(state, v);
  });
}
