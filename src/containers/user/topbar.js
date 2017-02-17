import React from 'react';
import { connect } from 'react-redux';

import 'styles/user';

import TopBar from 'components/common/topbar';
import BackButton from 'components/common/back_button';
import { get as getUser } from 'actions/users';
import { profilePicturePath } from 'helpers/s3';

const Left = () => <BackButton />;

const Center = props => {
  const { user } = props;

  return (
    <user-topbar-center>
      <img src={profilePicturePath(user, 'small')} />
      {user.name}
    </user-topbar-center>
  );
}

const Right = props => {
  return (<div />);
}

class TopBarContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { user_id, dispatch } = this.props;
    dispatch(getUser(user_id));
  }

  render() {
    const { user } = this.props;

    return <TopBar left={<Left />}
              center={<Center user={user} />}
              right={<Right />}/>;
  }
};

import { getResourceId } from 'selectors/navigation';
import { getUser as getUserSelector } from 'selectors/users';

export default connect(state => {
  return {
    user_id: getResourceId(state),
    init: function() {
      return {
        user_id: this.user_id,
        user: getUserSelector(state, this.user_id)
      }
    }
  }.init();
})(TopBarContainer);
