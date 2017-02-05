import React from 'react';

import Root from '../containers/root';
import Auth from '../containers/auth';
import RedirectTo from '../containers/redirect_to';
import Home from '../containers/home';
import List from '../containers/list';
import Search from '../containers/search';

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
  list: {
    component: <List />
  },
  search: {
    component: <Search />
  },
  default: {
    component: <div>default</div>
  }
};

export default RoutesComponents;
