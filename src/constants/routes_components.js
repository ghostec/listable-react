import React from 'react';

import Root from '../containers/root';
import Auth from '../containers/auth';
import Home from '../containers/home';
import RedirectTo from '../containers/redirect_to';

const RoutesComponents = {
  root: {
    component: <Root />,
    public: true
  },
  auth: {
    component: <Auth />,
    public: true
  },
  redirect: (location) => {
    return {
      component: <RedirectTo location={location} />,
      public: true
    }
  },
  home: {
    component: <Home />
  },
  default: {
    component: <div>default</div>
  }
};

export default RoutesComponents;
