import React from 'react';
import { connect } from 'react-redux';
import update from 'react-addons-update';

import * as lists from '../../actions/lists';

class Form extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    var newState = update(this.state, {
      [event.target.id]: {$set: event.target.value}
    });
    this.setState(newState);
  }

  handleSubmit(event) {
    const { name } = this.state;
    const { dispatch } = this.props;

    dispatch(lists.create({ name }));
    event.preventDefault();
  }

  render() {
    const { name } = this.state;
    const { dispatch, toggleForm } = this.props;
    const { handleSubmit, handleChange } = this;

    return (
      <quick-add-form>
        <form onSubmit={handleSubmit}>
          <input id="name" type="text" placeholder="Name new list" value={name} onChange={handleChange} />
          <quick-add-form-close onClick={toggleForm}/>
          <input id="quick-add-form-submit" type="submit" value="" />
        </form>
      </quick-add-form>
    );
  }
}

export default connect()(Form);
