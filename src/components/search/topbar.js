import React from 'react';

import 'styles/topbar';

export default (props) => {
  return (
    <topbar>
      <topbar-content>
        <topbar-left>
          <img src="images/back_gray.svg" onClick={props.back} />
        </topbar-left>
        <topbar-center>
          <input id="search" type="text" placeholder="Search" />
        </topbar-center>
        <topbar-right>
          <img src="images/search_gray.svg" />
        </topbar-right>
      </topbar-content>
    </topbar>
  );
};
