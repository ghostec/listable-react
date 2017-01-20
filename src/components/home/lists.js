import React from 'react';

export default (props) => {
  if(props.lists.isEmpty()) return <div>loading...</div>;

  const lists = props.lists.sort((a, b) => {
    return (a.get('last_seen_at') < b.get('last_seen_at') ? 1 : -1)
  }).entrySeq().map(([k, v]) => {
    const list = v.toJS();
    return <li key={k} onClick={() => props.goToList(list)}>{list.name}</li>;
  });

  return (
    <home-lists>
      <ul>
      {lists}
      </ul>
    </home-lists>
  );
}
