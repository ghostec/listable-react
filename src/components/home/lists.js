import React from 'react';
import _ from 'lodash';

import routes from 'constants/routes';
import redirect from 'helpers/redirect';

const goToList = list => {
  redirect(routes.generate('list', { id: list._id}));
}

const List = props => {
  const { list } = props;

  return (
    <li onClick={() => goToList(list)}>
      {list.name}
      {!list.public && <img src="images/padlock.svg" />}
    </li>
  );
}

export default props => {
  const { lists } = props;

  if(_.isEmpty(lists)) return <div>loading...</div>;

  const lists_lis = lists.map((list, k) => {
    return <List key={k} list={list} />;
  });

  return (
    <home-lists>
      {lists_lis}
    </home-lists>
  );
}
