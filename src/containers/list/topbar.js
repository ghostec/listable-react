import React from 'react';
import { connect } from 'react-redux';

import routes from 'constants/routes';
import TopBar from 'components/common/topbar';
import * as navigation from 'actions/navigation';
import * as lists from 'actions/lists';

const Left = props => {
  const { dispatch } = props;

  const back = () => dispatch(navigation.backBegin(routes.generate('home')));

  return (
    <img src="images/back.svg" onClick={back} />
  );
}

const Center = props => {
  const { dispatch, list, is_saved } = props;

  return (
    <div>
    {(!is_saved && !list.owner) && <list-topbar-save onClick={() => dispatch(lists.save(list._id))} >
      <img id="list-topbar-save-ring" src="images/open-ring-blue.svg" />
      <list-topbar-text>save</list-topbar-text>
    </list-topbar-save>}
    </div>
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
    const { list, n_items, is_saved, dispatch } = this.props;

    return <TopBar left={<Left dispatch={dispatch} />}
              center={<Center dispatch={dispatch} list={list} is_saved={is_saved} />}
              right={<Right n_items={n_items} />} />
  }
};

import { getUserId } from 'selectors/session';
import { getList, getListSize, isSaved } from 'selectors/lists';

export default connect(state => {
  return {
    list: getList(state),
    n_items: getListSize(state),
    is_saved: isSaved(state)
  }
})(TopBarContainer);
