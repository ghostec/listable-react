import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import "./styles/style";
import store from './reducers/index';
import * as navigation from './actions/navigation';

var onHashChange = () => {
  store.dispatch(navigation.complete())
};

window.addEventListener('hashchange', onHashChange, false);
onHashChange();

const APP_NODE = document.getElementById('app');

const App = (props) => {
  let Component;
  const location = props.navigation.get('location');
  switch(location.name) {
    case "root":
      Component = <div>root</div>;
      break;
    default:
      Component = <div>undefined</div>;
      break;
  }

  return Component;
}

const AppContainer = connect(state => state)(App)

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>, APP_NODE);
