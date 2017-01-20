import React from 'react';

import redirect from '../helpers/redirect';

class RedirectTo extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    redirect(this.props.location);
  }

  render() {
    return <div></div>
  };
}

export default RedirectTo;
