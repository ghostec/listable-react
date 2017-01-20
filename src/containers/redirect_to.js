import React from 'react';

class RedirectTo extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    window.location.replace(
      window.location.pathname + window.location.search + "#" + this.props.location
    )
  }

  render() {
    return <div></div>
  };
}

export default RedirectTo;
