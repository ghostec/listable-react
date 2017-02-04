import React from 'react';
import { connect } from 'react-redux';
import update from 'react-addons-update';
import _ from 'lodash';

import * as list_items from '../../actions/list_items';

class Form extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      url: '',
      name: '',
      show_name: false
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
    const { url, name } = this.state;
    const { dispatch, list, toggleForm } = this.props;

    dispatch(list_items.create(list._id, url, name))
    .then(() => toggleForm())
    .catch(errors => {
      if(errors.name) {
        this.setState({
          ...this.state,
          show_name: true
        });
      }
    });

    event.preventDefault();
  }

  render() {
    const { url, name, show_name } = this.state;
    const { dispatch, toggleForm } = this.props;
    const { handleSubmit, handleChange } = this;

    return (
      <quick-add-form>
      <form onSubmit={handleSubmit}>
      {show_name && <input id="name" type="text" placeholder="Item name" value={name} onChange={handleChange} />}
      <input id="url" type="text" placeholder="paste URL" value={url} onChange={handleChange} />
      <quick-add-form-close onClick={toggleForm}/>
      <input id="quick-add-form-submit" type="submit" value="" />
      </form>
      </quick-add-form>
    );
  }
}

export default connect()(Form);
