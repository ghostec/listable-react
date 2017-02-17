import React from 'react';

import 'styles/common';

import { profilePicturePath } from 'helpers/s3';
import routes from 'constants/routes';
import { history } from 'history';

const goToUser = (event, user_id) => {
  event.stopPropagation();
  history.push(routes.generate('user', { id: user_id }));
}

export default props => {
  const { list, user, onClickHandler } = props;

  return (
    <common-list-info onClick={onClickHandler}>
      <common-list-info-name>
        {list.name}
        {!list.public && <img src="/images/padlock.svg" />}
      </common-list-info-name>
      {user && <common-list-info-user onClick={event => goToUser(event, user._id)}>
        <img src={profilePicturePath(user, 'small')} />
        {user.name}
      </common-list-info-user>}
    </common-list-info>
  );
}
