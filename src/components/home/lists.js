import React from 'react';
import _ from 'lodash';

const List = props => {
  const { goToList, list } = props;

  return (
    <li onClick={() => goToList(list)}>
      {list.name}
      {!list.public && <img src="images/padlock.svg" />}
    </li>
  );
}

export default props => {
  const { lists, goToList } = props;

  if(_.isEmpty(lists)) return <div>loading...</div>;

  const lists_lis = lists.map((list, k) => {
    return <List key={k} list={list} goToList={goToList} />;
  });

  return (
    <home-lists>
      {lists_lis}
    </home-lists>
  );
}
