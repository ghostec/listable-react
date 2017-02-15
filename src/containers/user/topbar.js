import React from 'react';
import { connect } from 'react-redux';

import 'styles/user';

import TopBar from 'components/common/topbar';
import routes from 'constants/routes';
import redirect from 'helpers/redirect';
import { backBegin as navigationBack } from 'actions/navigation';
import { get as getUser } from 'actions/users';
import { profilePicturePath } from 'helpers/s3';

const Left = props => {
  const { dispatch } = props;

  const back = () => dispatch(navigationBack(routes.generate('home')));

  return (
    <img src="images/back.svg" onClick={back} />
  );
}

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
    const { user, dispatch } = this.props;

    return <TopBar left={<Left dispatch={dispatch} />}
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
