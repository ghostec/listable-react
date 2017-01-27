import React from 'react';

import * as lists from '../actions/lists';
import * as list_items from '../actions/list_items';
import * as user_list_items from '../actions/user_list_items';
import * as users from '../actions/users';
import { getUserId } from '../selectors/session';
import { getResourceId } from '../selectors/navigation';

export default (state, dispatch) => {
  const token = state.session.get('token', undefined);
  if(token == undefined) return;

  const location = state.navigation.get('location')

  if(location.name == 'home') {
    const user_id = getUserId(state);
    dispatch(lists.fromUser(user_id));
    dispatch(users.get(user_id));
  }
  else if(location.name == 'list') {
    const list_id = getResourceId(state);
    dispatch(lists.get(list_id));
    dispatch(list_items.fromList(list_id));
    dispatch(user_list_items.fromList(list_id));
  }
};
