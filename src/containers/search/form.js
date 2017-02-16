import React from 'react';
import update from 'react-addons-update';
import { bindAll } from 'lodash';

import Form from 'containers/common/form';

class SearchForm extends Form {
  constructor(props) {
    super(props)

    this.state = {
      search: '',
    }

    bindAll(this, 'handleChange');
  }

  handleChange(event) {
    this.props.search(event.target.value);
    super.handleChange(event);
  }

  render() {
    const { search } = this.state;
    const { handleChange } = this;

    return (
      <input id="search" type="text" placeholder="Search" autoComplete="off" value={search} onChange={handleChange} /> 
    );
  }
}

export default SearchForm;
