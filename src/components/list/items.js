import React from 'react';
import _ from 'lodash';

import Options from './options/list_item';

const Done = props => {
  const { item, toggleDone } = props;
  const { done } = item;

  const donePart = (
    <img src="images/ring-checked.svg" />
  );

  const notDonePart = [
    <img src="images/open-ring-blue.svg" />,
    "done"
  ].map((v, k) => <span key={k}>{v}</span>);

  return (
    <list-item-info-right-done onClick={(event) => toggleDone(event, item)}>
      {done ? donePart : notDonePart}
    </list-item-info-right-done>
  );
}

const Item = props => {
  const { item, dispatch, toggleDone, toggleOptions } = props;
  const options_component = <Options item={item} toggleOptions={toggleOptions} dispatch={dispatch} />;

  return (
    <li onClick={(event) => toggleOptions(event, options_component)}>
      <list-item-info>
        <list-item-info-left>
          <img src="images/youtube.svg" />
        </list-item-info-left>
        <list-item-info-right>
          <Done item={item} toggleDone={toggleDone}/>
        </list-item-info-right>
      </list-item-info>
      <list-item-name>{item.name}</list-item-name>
    </li>
  );
};

export default props => {
  if(_.isEmpty(props.list_items)) return <div>loading...</div>;

  const { dispatch, toggleDone, toggleOptions } = props;

  return (
    <list-items>
      <ul>{props.list_items.map((v, k) => <Item key={k} item={v} dispatch={dispatch} toggleDone={toggleDone} toggleOptions={toggleOptions} />)}</ul>
    </list-items>
  );
};
