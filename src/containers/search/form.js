import React from 'react';
import update from 'react-addons-update';
import { bindAll } from 'lodash';

class Form extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      search: '',
    }

    bindAll(this, 'handleChange');
  }

  handleChange(event) {
    const { search } = this.props;

    search(event.target.value);

    var newState = update(this.state, {
      [event.target.id]: {$set: event.target.value}
    });
    this.setState(newState);
  }

  render() {
    const { search } = this.state;
    const { handleChange } = this;

    return (
      <input id="search" type="text" placeholder="Search" value={search} onChange={handleChange} /> 
    );
  }
}

export default Form;
