import React from 'react';

import routes from 'constants/routes';
import * as navigation from 'actions/navigation';
import TopBar from 'components/search/topbar';

class TopBarContainer extends React.Component {
  constructor(props) {
    super(props);

    this.back = this.back.bind(this);
  }

  back() {
    this.props.dispatch(navigation.backBegin(routes.generate('home')));
  }

  render() {
    const { back } = this;

    return <TopBar back={back} />
  }
};

export default TopBarContainer;
