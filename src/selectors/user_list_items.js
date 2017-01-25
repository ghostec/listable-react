import { createSelector } from 'reselect';
import _ from 'lodash';

import * as navigation from './navigation';
import * as session from './session';

export const getUserListItems = state => {
  const list_id = navigation.getResourceId(state);
  const user_list_items = state.user_list_items &&
    state.user_list_items.get(list_id) &&
    state.user_list_items.get(list_id).toJS();

  const sss = user_list_items && _.reduce(user_list_items, (acc, v, k) => {
    acc[k] = session.includeOwner(state, v);
    return acc;
  }, {});

  return sss;
}
