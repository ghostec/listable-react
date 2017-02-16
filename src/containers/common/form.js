import React from 'react';
import update from 'react-addons-update';
import { bindAll } from 'lodash';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    bindAll(this, 'handleChange');
  }

  handleChange(event) {
    var newState = update(this.state, {
      [event.target.id]: {$set: event.target.value}
    });
    this.setState(newState);
  }
}

export default Form;
