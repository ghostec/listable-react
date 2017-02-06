import React from 'react';
import { connect } from 'react-redux';

import TopBar from 'components/common/topbar';
import Options from 'containers/home/options/options';
import routes from 'constants/routes';
import redirect from 'helpers/redirect';

const Left = props => {
  const { options, toggleOptions } = props;

  return (
    <img src="images/more.svg" onClick={event => toggleOptions(event, options)} />
  );
}

const Center = props => {
  const { search } = props;

  return (
    <span>Listabble</span>
  );
}

const Right = props => {
  const goToSearch = () => {
    redirect(routes.generate('search'));
  }

  return (
    <img src="images/search.svg" onClick={goToSearch} />
  );
}

class TopBarContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { toggleOptions, dispatch } = this.props;

    const options = <Options toggleOptions={toggleOptions} dispatch={dispatch} />;

    return <TopBar left={<Left toggleOptions={toggleOptions} options={options} />}
              center={<Center />}
              right={<Right />}/>;
  }
};

export default connect()(TopBarContainer);
