import React from 'react';

import { history } from 'history';

class RedirectTo extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    history.push(this.props.location);
  }

  render() {
    return <div />
  };
}

export default RedirectTo;
