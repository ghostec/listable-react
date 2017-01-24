import React from 'react';

export default (props) => {
  return (
    <img src="images/add-blue.svg" id="add-button" onClick={props.toggleForm} />
  );
}
