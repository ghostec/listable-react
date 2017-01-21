import React from 'react';

export default (props) => {
  if(props.list_items.isEmpty()) return <div>loading...</div>;

  const items = props.list_items.sort((a, b) => {
    return (a.get('updated_at') < b.get('updated_at') ? 1 : -1)
  }).entrySeq().map(([k, v]) => {
    const item = v.toJS();
    return <li key={k}>{item.name}</li>;
  });

  return (
    <list-items>
      <ul>{items}</ul>
    </list-items>
  );
};
