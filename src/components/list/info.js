import React from 'react';

export default (props) => {
  const { list } = props;

  return (
    <list-info>
      <list-info-name>{list.name}</list-info-name>
      {!list.public && <img src="images/padlock.svg" />}
    </list-info>
  );
};
