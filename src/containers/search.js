import React from 'react';
import { connect } from 'react-redux';
import { bindAll } from 'lodash';

import 'styles/search';

import TopBar from 'containers/search/topbar';
import Lists from 'components/common/lists';
import { search as searchLists } from 'actions/lists';

class Search extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      results: {}
    };

    bindAll(this, 'search');
  }

  search(v) {
    const { dispatch } = this.props;

    dispatch(searchLists(v)).then(results => {
      results.users = results.users.reduce((obj, user) => {
        obj[user._id] = user;
        return obj;
      }, {});

      this.setState({
        ...this.state,
        results
      });
    });
  }

  componentDidMount() {
    document.title = 'Listavel';
    this.search('');
  }
  
  render() {
    const { dispatch } = this.props;
    const { results } = this.state;
    const { search } = this;

    return (
      <search>
        <TopBar dispatch={dispatch} search={search} />
        <vertical-20px />
        <Lists lists={results && results.lists} users={results && results.users} />
      </search>
    );
  }
};

export default connect()(Search); 

