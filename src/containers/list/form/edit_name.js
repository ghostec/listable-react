import React from 'react';
import { connect } from 'react-redux';
import update from 'react-addons-update';
import _ from 'lodash';

import { patch as patchList } from 'actions/lists';

class Form extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: props.list.name,
    }

    _.bindAll(this, 'handleChange', 'handleSubmit');
  }

  handleChange(event) {
    var newState = update(this.state, {
      [event.target.id]: {$set: event.target.value}
    });
    this.setState(newState);
  }

  handleSubmit(event) {
    const { name } = this.state;
    const { dispatch, list, toggleForm } = this.props;

    dispatch(patchList(list, { name }))
    .then(() => toggleForm())
    .catch(errors => {
      console.log(errors);
    });

    event.preventDefault();
  }

  render() {
    const { name } = this.state;
    const { dispatch, toggleForm } = this.props;
    const { handleSubmit, handleChange } = this;

    return (
      <quick-add-form>
      <form onSubmit={handleSubmit}>
      <input id="name" type="text" placeholder={name} value={name} onChange={handleChange} />
      <quick-add-form-close onClick={toggleForm}/>
      <input id="quick-add-form-submit" type="submit" value="" />
      </form>
      </quick-add-form>
    );
  }
}

export default connect()(Form);
