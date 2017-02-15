import React from 'react';
import { connect } from 'react-redux';
import { bindAll } from 'lodash';

import 'styles/search';

import { fromUser as listsFromUser } from 'actions/lists';

import TopBar from 'containers/user/topbar';
import Lists from 'components/common/lists';

class User extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { user_id, dispatch } = this.props;
    dispatch(listsFromUser(user_id));
  }
  
  render() {
    const { lists, users, user_id, dispatch } = this.props;

    return (
      <user>
        <TopBar />
        <vertical-20px />
        <Lists lists={lists} users={users} user_id={user_id} />
      </user>
    );
  }
};

import { getResourceId } from 'selectors/navigation';
import { getLists } from 'selectors/lists';
import { getUsers } from 'selectors/users';

export default connect(state => {
  return {
    user_id: getResourceId(state),
    init: function() {
      return {
        user_id: this.user_id,
        lists: getLists(state, this.user_id),
        users: getUsers(state)
      }
    }
  }.init();
})(User); 
