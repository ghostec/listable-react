import React from 'react';
import _ from 'lodash';

const Item = props => {
  return (
    <li>
      <list-item-info>
        <list-item-info-left>
          <img src="images/youtube.svg" />
        </list-item-info-left>
        <list-item-info-right>
          <list-item-info-right-done>
            <img src="images/open-ring-blue.svg" />
            done
          </list-item-info-right-done>
        </list-item-info-right>
      </list-item-info>
      <list-item-name>{props.item.name}</list-item-name>
    </li>
  );
};

export default props => {
  if(_.isEmpty(props.list_items)) return <div>loading...</div>;

  const sorted = _.map(props.list_items, v => v).sort((a, b) => {
    return (a.updated_at < b.updated_at ? 1 : -1)
  });

  return (
    <list-items>
      <ul>{sorted.map((v, k) => <Item key={k} item={v} />)}</ul>
    </list-items>
  );
};
