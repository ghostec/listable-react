import React from 'react';
import { connect } from 'react-redux';

import TopBar from '../../components/home/topbar';

class TopBarContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { toggleOptions, dispatch } = this.props;

    return <TopBar toggleOptions={toggleOptions} dispatch={dispatch} />;
  }
};

export default connect()(TopBarContainer);
