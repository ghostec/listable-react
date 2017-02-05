import React from 'react';
import _ from 'lodash';

import 'styles/common';

import routes from 'constants/routes';
import redirect from 'helpers/redirect';

const goToList = list => {
  redirect(routes.generate('list', { id: list._id}));
}

const List = props => {
  const { list } = props;

  return (
    <common-lists-list onClick={() => goToList(list)}>
      {list.name}
      {!list.public && <img src="images/padlock.svg" />}
    </common-lists-list>
  );
}

export default props => {
  const { lists } = props;

  if(_.isEmpty(lists)) return <div>loading...</div>;

  const lists_lis = lists.map((list, k) => {
    return <List key={k} list={list} />;
  });

  return (
    <common-lists>
      {lists_lis}
    </common-lists>
  );
}
