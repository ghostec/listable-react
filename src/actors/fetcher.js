import React from 'react';

import * as lists from '../actions/lists';
import * as list_items from '../actions/list_items';
import * as user_list_items from '../actions/user_list_items';

export default (state, dispatch) => {
  const token = state.session.get('token', undefined);
  if(token == undefined) return;

  const location = state.navigation.get('location')

  if(location.name == 'home') {
    const user_id = state.session.get('user').get('_id');
    dispatch(lists.fromUser(user_id));
  }
  else if(location.name == 'list') {
    const list_id = location.options.id;
    dispatch(lists.get(list_id));
    dispatch(list_items.fromList(list_id));
    dispatch(user_list_items.fromList(list_id));
  }
};
