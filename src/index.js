require('es6-promise').polyfill();
require('isomorphic-fetch');

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';

import "./styles/style";
import store from './reducers/index';
import * as navigation from './actions/navigation';
import renderer from './actors/renderer';


var onHashChange = () => {
  store.dispatch(navigation.complete())
};

window.addEventListener('hashchange', onHashChange, false);
onHashChange();

const actors = [renderer]

let acting = false;
store.subscribe(() => {
  if(!acting) {
    acting = true;
    for(let actor of actors) actor(store.getState(), store.dispatch)
    acting = false;
  }
})
