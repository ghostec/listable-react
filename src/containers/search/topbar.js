import React from 'react';

import TopBar from 'components/common/topbar';
import BackButton from 'components/common/back_button';
import Form from 'containers/search/form';

class TopBarContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { back } = this;
    const { search } = this.props;

    return <TopBar left={<BackButton />}
              center={<Form search={search} />}
              right={<img src="/images/search_gray.svg" />} />
  }
};

export default TopBarContainer;
