import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import Lists from '../../components/home/lists';

class ListsContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { lists } = this.props;

    if(_.isEmpty(lists)) return <div>loading...</div>;
    
    return <Lists lists={lists} />; 
  }
};

const mapStateToProps = state => {
  const sorted_lists = _.map(state.lists.toJS(), v => v).sort((a, b) => {
    return (a.last_seen_at < b.last_seen_at ? 1 : -1)
  });

  return {
    lists: sorted_lists
  };
}

export default connect(mapStateToProps)(ListsContainer);

