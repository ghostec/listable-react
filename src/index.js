require('es6-promise').polyfill();
require('isomorphic-fetch');

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';

import store from './reducers/index';
import RoutesComponents from './constants/routes_components';
import * as navigation from './actions/navigation';
import routes from './constants/routes';
import _ from 'lodash';


var onHashChange = () => {
  const new_hash = window.location.hash.substr(1);
  const new_route = routes.lookup(new_hash);
  const { location, history } = store.getState().navigation.toJS();

  if(_.isEqual(new_route, location)) return; // same hash

  if(_.isEqual(new_route, history[0])) { // back hash
    store.dispatch(navigation.backEnd());
  } else {
    store.dispatch(navigation.navigate(new_hash));
  }
};

window.addEventListener('hashchange', onHashChange, false);
onHashChange();

const App = (props) => {
  const { rehydrated } = props.storage.toObject();
  if(!rehydrated) return <div/>;

  const location = props.navigation.get('location');
  const token = props.session.get('token', undefined);

  let route = (location && RoutesComponents[location.name]) || RoutesComponents.default;
  if(token == undefined && route.public != true) {
    route = RoutesComponents.redirect('auth');
  }

  return route.component;
}

const AppContainer = connect(state => state)(App);

const APP_NODE = document.getElementById('app')

ReactDOM.render(
  <Provider store={store}><AppContainer /></Provider>,
    APP_NODE
);
