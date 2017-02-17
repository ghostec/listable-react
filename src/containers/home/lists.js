import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import Lists from 'components/common/lists';
import * as lists from 'actions/lists';

class ListsContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { user_id, dispatch } = this.props;
    dispatch(lists.fromUser(user_id));
  }

  render() {
    const { lists, users, user_id } = this.props;
    return <Lists lists={lists} users={users} user_id={user_id} />; 
  }
};

import { getUserId } from 'selectors/session';
import { getLists } from 'selectors/lists';
import { getUsers } from 'selectors/users';

export default connect(state => {
  return {
    user_id: getUserId(state),
    lists: getLists(state),
    users: getUsers(state),
  };
})(ListsContainer);
