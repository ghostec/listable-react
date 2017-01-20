import React from 'react';

export default (props) => {
  return (
    <list-info>
      <list-info-name>{props.list.get('name')}</list-info-name>
    </list-info>
  );
};
