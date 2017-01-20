import React from 'react';

export default (props) => {
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
          <list-topbar-text>16 items</list-topbar-text>
        </topbar-right>
      </topbar-content>
    </topbar>
  );
};
