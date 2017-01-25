import React from 'react';
import { connect } from 'react-redux';

import Items from '../../components/list/items';
import * as list_items from '../../actions/list_items';

class ItemsContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Items {...this.props} />;
  }
};

import { getUserListItems } from '../../selectors/user_list_items';
import { getListItems } from '../../selectors/list_items';

const mapStateToProps = state => {
  return {
    user_list_items: getUserListItems(state),
    list_items: getListItems(state)
  };
}

export default connect(mapStateToProps)(ItemsContainer);
