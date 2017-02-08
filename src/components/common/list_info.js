import React from 'react';

import 'styles/common';

import { profilePicturePath } from 'helpers/s3';

export default props => {
  const { list, user, onClickHandler } = props;

  return (
    <common-list-info onClick={onClickHandler}>
      <common-list-info-name>
        {list.name}
        {!list.public && <img src="images/padlock.svg" />}
      </common-list-info-name>
      {user && <common-list-info-user>
        <img src={profilePicturePath(user, 'small')} />
        {user.name}
      </common-list-info-user>}
    </common-list-info>
  );
}
