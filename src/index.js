require('es6-promise').polyfill();
require('isomorphic-fetch');

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';

import "./styles/style";
import store from './reducers/index';
import * as navigation from './actions/navigation';
import renderer from './actors/renderer';
import fetcher from './actors/fetcher';
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

const actors = [fetcher, renderer]

let acting = false;
store.subscribe(() => {
  if(!acting) {
    acting = true;
    for(let actor of actors) actor(store.getState(), store.dispatch)
    acting = false;
  }
})
