import React from 'react';

import Auth from '../containers/auth';
import Home from '../containers/home';

const RoutesComponents = {
  root: {
    component: <div>root</div>
  },
  auth: {
    component: <Auth />
  },
  home: {
    component: <Home />
  },
  default: {
    component: <div>default</div>
  }
};

export default RoutesComponents;
