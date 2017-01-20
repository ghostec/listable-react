import React from 'react'

import * as lists from '../actions/lists'

export default (state, dispatch) => {
  const location = state.navigation.get('location')

  if(location.name == 'home') {
    dispatch(lists.index());
  }
}
