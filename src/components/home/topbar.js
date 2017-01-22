import React from 'react';

import '../../styles/topbar';

export default (props) => {
  return (
    <topbar>
      <topbar-wrap>
        <topbar-content>
          <topbar-left>
            <img src="images/more.svg" onClick={props.signOut} />
          </topbar-left>
          <topbar-center>
            Listable
          </topbar-center>
          <topbar-right>
            <img src="images/search.svg" />
          </topbar-right>
        </topbar-content>
      </topbar-wrap>
    </topbar>
  );
};
