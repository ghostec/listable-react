import React from 'react';
import { connect } from 'react-redux';

import 'styles/search';

import TopBar from './search/topbar';

class Search extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    const { dispatch } = this.props;

    return (
      <search>
        <TopBar dispatch={dispatch} />
      </search>
    );
  }
};

export default connect()(Search); 

