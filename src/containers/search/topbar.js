import React from 'react';

import routes from 'constants/routes';
import * as navigation from 'actions/navigation';
import TopBar from 'components/common/topbar';
import Form from 'containers/search/form';

const Left = props => {
  const { back } = props;

  return (
    <img src="images/back_gray.svg" onClick={back} />
  );
}

const Center = props => {
  const { search } = props;

  return (
    <Form search={search} />
  );
}

const Right = props => {
  return (
    <img src="images/search_gray.svg" />
  );
}

class TopBarContainer extends React.Component {
  constructor(props) {
    super(props);

    this.back = this.back.bind(this);
  }

  back() {
    this.props.dispatch(navigation.backBegin(routes.generate('home')));
  }

  render() {
    const { back } = this;
    const { search } = this.props;

    return <TopBar left={<Left back={back} />}
              center={<Center search={search} />}
              right={<Right />} />
  }
};

export default TopBarContainer;
