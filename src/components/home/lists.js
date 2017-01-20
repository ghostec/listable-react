import React from 'react';

export default (props) => {
  if(props.lists.isEmpty()) return <div>loading...</div>;

  const lists = props.lists.entrySeq().map(([k, v]) => {
    return <li key={k}>{v.get('name')}</li>;
  });

  return (
    <home-lists>
      <ul>
      {lists}
      </ul>
    </home-lists>
  );
}
