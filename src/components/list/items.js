import React from 'react';
import _ from 'lodash';

import Options from './options/list_item';
import * as user_list_items from '../../actions/user_list_items';

const toggleDone = (event, dispatch, user_item) => {
  dispatch(user_list_items.patch(user_item, {
    done: !user_item.done
  }));
  event.stopPropagation();
}

const Done = props => {
  const { user_item, dispatch } = props;

  if(_.isEmpty(user_item)) return <div>loading...</div>;

  const { done } = user_item;

  const donePart = (
    <img src="images/ring-checked.svg" />
  );

  const notDonePart = [
    <img src="images/open-ring-blue.svg" />,
    "done"
  ].map((v, k) => <span key={k}>{v}</span>);

  return (
    <list-item-info-right-done onClick={(event) => toggleDone(event, dispatch, user_item)}>
      {done ? donePart : notDonePart}
    </list-item-info-right-done>
  );
}

const Item = props => {
  const { item, user_item, dispatch, toggleOptions } = props;
  const options_component = <Options item={item} toggleOptions={toggleOptions} dispatch={dispatch} />;

  return (
    <list-item onClick={(event) => toggleOptions(event, options_component)}>
      <list-item-info>
        <list-item-info-left>
          <img src={`images/${item.type}.svg`} />
        </list-item-info-left>
        <list-item-info-right>
          {(user_item && user_item.owner) && <Done user_item={user_item} dispatch={dispatch} />}
        </list-item-info-right>
      </list-item-info>
      <list-item-name>{item.name}</list-item-name>
    </list-item>
  );
};

export default props => {
  const { list_items, user_list_items, dispatch, toggleOptions } = props;

  if(_.isEmpty(list_items)) return <div>loading...</div>;

  return (
    <list-items>
      {list_items.map((item, k) => <Item key={k} item={item} user_item={user_list_items && user_list_items[item._id]} dispatch={dispatch} toggleOptions={toggleOptions} />)}
    </list-items>
  );
};
