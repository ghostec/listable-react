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

import { getLists } from '../../selectors/lists';

const mapStateToProps = state => {
  return {
    lists: getLists(state)
  };
}

export default connect(mapStateToProps)(ListsContainer);

