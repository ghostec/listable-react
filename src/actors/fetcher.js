import React from 'react'

import * as lists from '../actions/lists'

export default (state, dispatch) => {
  const token = state.session.get('token', undefined);
  if(token == undefined) return;

  const location = state.navigation.get('location')

  if(location.name == 'home') {
    dispatch(lists.index());
  }
  else if(location.name == 'list') {
    dispatch(lists.get(location.options));
  }
}
