import React from 'react';
import { connect } from 'react-redux';
import update from 'react-addons-update';

import * as list_items from '../../actions/list_items';

class Form extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      url: ''
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
    const { url } = this.state;
    const { dispatch, list, toggleForm } = this.props;

    dispatch(list_items.create(list._id, url));

    toggleForm();

    event.preventDefault();
  }

  render() {
    const { url } = this.state;
    const { dispatch, toggleForm } = this.props;
    const { handleSubmit, handleChange } = this;

    return (
      <quick-add-form>
        <form onSubmit={handleSubmit}>
          <input id="url" type="text" placeholder="paste URL" value={url} onChange={handleChange} />
          <quick-add-form-close onClick={toggleForm}/>
          <input id="quick-add-form-submit" type="submit" value="" />
        </form>
      </quick-add-form>
    );
  }
}

export default connect()(Form);
