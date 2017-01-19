import React from 'react';

import Auth from '../containers/auth';

const RoutesComponents = {
  root: {
    component: <div>root</div>
  },
  auth: {
    component: <Auth />
  },
  default: {
    component: <div>default</div>
  }
};

export default RoutesComponents;
