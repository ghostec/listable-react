import React from 'react';
import update from 'react-addons-update';
import { connect } from 'react-redux';

import RedirectTo from './redirect_to';
import * as session from '../actions/session';

const Root = (props) => {
    const { token } = props;
    return <RedirectTo location={token ? 'home' : 'auth'} />;
}

export default connect(state => {
  return {
    token: state.session.get('token')
  };
})(Root);

