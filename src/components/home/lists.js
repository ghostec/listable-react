import React from 'react';

export default (props) => {
  if(props.lists == undefined) return <div>loading...</div> 

  return (
    <home-lists>
      <ul>
        {props.lists.entrySeq().map(([k, v]) => <li key={k}>{v.get('name')}</li>)}
      </ul>
    </home-lists>
  );
}
