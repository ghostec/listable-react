require('es6-promise').polyfill();
require('isomorphic-fetch');

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';

import store from './reducers/index';
import RoutesComponents from './constants/routes_components';
import * as navigation from './actions/navigation';
import routes from './constants/routes';
import Toast from 'components/common/toast';
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

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toast_message: null
    }

    _.bindAll(this, 'showToast');
  }

  showToast(toast_message) {
    this.setState({
      ...this.state,
      toast_message
    });

    setTimeout(() => {
      this.setState({
        ...this.state,
        toast_message: null
      });
    }, 2000);
  }

  render() {
    const { rehydrated } = this.props;
    if(!rehydrated) return <div />;

    const { location, token } = this.props;

    let route = (location && RoutesComponents[location.name]) || RoutesComponents.default;
    if(!token && route.public != true) {
      route = RoutesComponents.redirect('auth');
    }

    return (
      <app>
        {this.state.toast_message && <Toast message={this.state.toast_message}/>}
        <route.component {...route.props} showToast={this.showToast} />
      </app>
    );
  }
}

const AppContainer = connect(state => {
  return {
    rehydrated: state.storage.get('rehydrated'),
    location: state.navigation.get('location'),
    token: state.session.get('token')
  }
})(App);

const APP_NODE = document.getElementById('app')

ReactDOM.render(
  <Provider store={store}><AppContainer /></Provider>,
    APP_NODE
);
