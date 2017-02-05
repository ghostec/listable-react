import React from 'react';

import 'styles/topbar';

export default (props) => {
  const { left, center, right } = props;
  return (
    <topbar>
      <topbar-content>
        <topbar-left>{left}</topbar-left>
        <topbar-center>{center}</topbar-center>
        <topbar-right>{right}</topbar-right>
      </topbar-content>
    </topbar>
  );
};
