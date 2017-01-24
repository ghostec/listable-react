import React from 'react';
import { connect } from 'react-redux';

import TopBar from '../../components/list/topbar';
import * as navigation from '../../actions/navigation';

class TopBarContainer extends React.Component {
  constructor(props) {
    super(props);

    this.back = this.back.bind(this);
  }

  back() {
    this.props.dispatch(navigation.backBegin());
  }

  render() {
    const { back } = this;

    return <TopBar back={back} />
  }
};

export default connect()(TopBarContainer);
