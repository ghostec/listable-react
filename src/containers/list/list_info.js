import React from 'react';
import { connect } from 'react-redux';
import { bindAll } from 'lodash';

import ListInfo from 'components/common/list_info';
import Options from 'components/list/options/list';
import Form from 'containers/list/form/edit_name';

const listClickHandler = (event, props) => {
  const { dispatch, toggleOptions, list, toggleForm } = props;
  const OptionsComponent = <Options toggleOptions={toggleOptions} dispatch={dispatch} list={list} toggleForm={toggleForm} />;
  toggleOptions(event, OptionsComponent);
}

class ListInfoContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show_form: false
    };

    bindAll(this, 'toggleForm');
  }

  toggleForm() {
    this.setState({
      ...this.state,
      show_form: !this.state.show_form
    });
  }

  render() {
    const { show_form } = this.state;
    const { dispatch, toggleOptions, list } = this.props;
    const { toggleForm } = this;

    let Component;
    if(show_form) Component = <Form list={list} toggleForm={toggleForm}/>;
    else Component = <ListInfo {...this.props} onClickHandler={event => listClickHandler(event, {
      dispatch, toggleOptions, list, toggleForm
    })} />;

    return Component;
  }
};

export default connect()(ListInfoContainer);
