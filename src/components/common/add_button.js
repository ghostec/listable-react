import React from 'react';

export default (props) => {
  const { toggleForm } = props;

  return (
    <img src="images/add-blue.svg" id="add-button" onClick={toggleForm} />
  );
}
