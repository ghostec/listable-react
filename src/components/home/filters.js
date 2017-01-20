import React from 'react';

export default (props) => {
  return (
    <home-filters>
      <ul>
        <li className="active">ALL</li>
        <li>DONE</li>
        <li>UNDONE</li>
        <li>FAVORITES</li>
      </ul>
    </home-filters>
  );
}
