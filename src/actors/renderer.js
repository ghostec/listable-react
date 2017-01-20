import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';

import store from '../reducers/index';
import RoutesComponents from '../constants/routes_components';

const APP_NODE = document.getElementById('app')

export default (state, dispatch) => {
  const { rehydrated } = state.storage.toObject();
  if(!rehydrated) return;
  
  const App = (props) => {
    const location = props.state.navigation.get('location');
    const token = state.session.get('token', undefined);

    let route = RoutesComponents[location.name] || RoutesComponents.default;
    if(token == undefined && route.public != true) {
      route = RoutesComponents.redirect('auth');
    }

    return route.component;
  }

  ReactDOM.render(
    <Provider store={store}><App state={state} dispatch={dispatch} /></Provider>,
      APP_NODE
  )
}
