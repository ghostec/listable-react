import React from 'react';
import { isEmpty } from 'lodash';

import 'styles/common';

import routes from 'constants/routes';
import redirect from 'helpers/redirect';
import ListInfo from 'components/common/list_info';
import Empty from 'components/common/empty';

const goToList = list => {
  redirect(routes.generate('list', { id: list._id}));
}

export default props => {
  const { lists, users, user_id } = props;

  if(isEmpty(lists) || isEmpty(users)) return <Empty />;

  const Lists = lists.map((list, k) => {
    return <ListInfo key={k} list={list} user={(user_id != list._userId) && users[list._userId]} onClickHandler={() => goToList(list)} />;
  });

  return (
    <common-lists>
      {Lists}
    </common-lists>
  );
}
