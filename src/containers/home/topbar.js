import React from 'react';
import { connect } from 'react-redux';

import TopBar from '../../components/home/topbar';
import * as session from '../../actions/session';

class TopBarContainer extends React.Component {
  constructor(props) {
    super(props);

    this.signOut = this.signOut.bind(this);
  }

  signOut() {
    this.props.dispatch(session.signOut());
  }

  render() {
    const { signOut } = this;

    return <TopBar signOut={signOut} />;
  }
};

export default connect()(TopBarContainer);
