import React from 'react';

export default (props) => {
  const { n_items } = props;

  return (
    <topbar>
      <topbar-content>
        <topbar-left>
          <img src="images/back.svg" onClick={props.back} />
        </topbar-left>
        <topbar-center>
          <list-topbar-save>
            <img id="list-topbar-save-ring" src="images/open-ring-blue.svg" />
            <list-topbar-text>save</list-topbar-text>
          </list-topbar-save>
        </topbar-center>
        <topbar-right>
        {n_items != undefined && n_items > 0 && <list-topbar-text>{n_items} {n_items == 1 ? 'item' : 'items'}</list-topbar-text>}
        </topbar-right>
      </topbar-content>
    </topbar>
  );
};
