import React from 'react';
import { connect } from 'react-redux';

import routes from 'constants/routes';
import TopBar from 'components/common/topbar';
import * as navigation from 'actions/navigation';

const Left = props => {
  const { dispatch } = props;

  const back = () => dispatch(navigation.backBegin(routes.generate('home')));

  return (
    <img src="images/back.svg" onClick={back} />
  );
}

const Center = props => {
  return (
    <list-topbar-save>
      <img id="list-topbar-save-ring" src="images/open-ring-blue.svg" />
      <list-topbar-text>save</list-topbar-text>
    </list-topbar-save>
  );
}

const Right = props => {
  const { n_items } = props;

  return (<span>
    {n_items != undefined && n_items > 0 && <list-topbar-text>{n_items} {n_items == 1 ? 'item' : 'items'}</list-topbar-text>}
  </span>);
}

class TopBarContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { n_items, dispatch } = this.props;

    return <TopBar left={<Left dispatch={dispatch} />}
              center={<Center />}
              right={<Right n_items={n_items} />} />
  }
};

export default connect()(TopBarContainer);
