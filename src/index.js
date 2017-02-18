require('es6-promise').polyfill();
require('isomorphic-fetch');

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';

import store from './reducers/index';
import Toast from 'components/common/toast';
import RedirectTo from 'containers/redirect_to';
import _ from 'lodash';
import { history, resolve } from 'history';

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

    const { route, token } = this.props;

    if(!token && route.public != true) return <RedirectTo location={'/auth'} />;

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
    token: state.session.get('token')
  }
})(App);

const APP_NODE = document.getElementById('app')

const render = location => {
  const route = resolve(location);

  ReactDOM.render(
    <Provider store={store}><AppContainer route={route}/></Provider>,
      APP_NODE
  );
}

history.listen(render);
render(history.location);
