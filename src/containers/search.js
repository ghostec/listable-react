import React from 'react';
import { connect } from 'react-redux';
import { bindAll } from 'lodash';

import 'styles/search';

import TopBar from 'containers/search/topbar';
import Lists from 'components/common/lists';
import * as lists from 'actions/lists';

class Search extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      results: null
    };

    bindAll(this, 'search');
  }

  search(v) {
    const { dispatch } = this.props;

    dispatch(lists.search(v)).then(results => {
      this.setState({
        ...this.state,
        results
      });
    });
  }
  
  render() {
    const { dispatch } = this.props;
    const { results } = this.state;
    const { search } = this;

    return (
      <search>
        <TopBar dispatch={dispatch} search={search} />
        <Lists lists={results} />
      </search>
    );
  }
};

export default connect()(Search); 

