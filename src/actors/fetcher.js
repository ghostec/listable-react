import React from 'react'

import * as lists from '../actions/lists'
import * as list_items from '../actions/list_items'

export default (state, dispatch) => {
  const token = state.session.get('token', undefined);
  if(token == undefined) return;

  const location = state.navigation.get('location')

  if(location.name == 'home') {
    dispatch(lists.index());
  }
  else if(location.name == 'list') {
    const list_id = location.options.id;
    dispatch(list_items.fromList(list_id));
  }
};
