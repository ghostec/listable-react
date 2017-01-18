import React from 'react'
import ReactDOM from 'react-dom'

import RoutesComponents from '../constants/routes_components';

const APP_NODE = document.getElementById('app')

export default (state, dispatch) => {
  //const { rehydrated } = state.storage.toObject()
  //if(!rehydrated) return
  
  const App = (props) => {
    const location = props.state.navigation.get('location');
    const route = RoutesComponents[location.name] || RoutesComponents.default;

    return route.component;
  }

  ReactDOM.render(
    <App state={state} dispatch={dispatch} />,
      APP_NODE
  )
}
