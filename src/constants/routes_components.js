import React from 'react';

import Root from 'containers/root';
import Auth from 'containers/auth';
import ResetPassword from 'containers/reset_password';
import RedirectTo from 'containers/redirect_to';
import Home from 'containers/home';
import List from 'containers/list';
import User from 'containers/user';
import Search from 'containers/search';

const RoutesComponents = {
  root: {
    component: Root,
    public: true
  },
  auth: {
    component: Auth,
    public: true
  },
  reset_password: {
    component: ResetPassword,
    public: true
  },
  redirect: (location) => {
    return {
      component: RedirectTo,
      props: {
        location
      },
      public: true
    }
  },
  home: {
    component: Home
  },
  list: {
    component: List
  },
  user: {
    component: User
  },
  search: {
    component: Search
  },
  default: {
    component: <div>default</div>
  }
};

export default RoutesComponents;
