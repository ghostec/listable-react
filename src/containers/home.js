import React from 'react';
import { connect } from 'react-redux';

import '../styles/home';

import * as lists from '../actions/lists';
import * as users from '../actions/users';
import { getUserId } from '../selectors/session';

import TopBar from './home/topbar';
import Lists from './home/lists';
import Form from './home/form';
import Filters from '../components/home/filters';
import AddButton from '../components/common/add_button';

class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      show_form: false,
      options_component: null
    };

    this.toggleForm = this.toggleForm.bind(this);
    this.toggleOptions = this.toggleOptions.bind(this);
  }

  toggleForm() {
    this.setState({
      ...this.state,
      show_form: !this.state.show_form
    });
  }

  toggleOptions(event, component = null) {
    this.setState({
      ...this.state,
      options_component: component,
    });
  }

  componentDidMount() {
    const { user_id, dispatch } = this.props;
    dispatch(lists.fromUser(user_id));
    dispatch(users.get(user_id));
  }

  render() {
    const { lists } = this.props;
    const { show_form, options_component } = this.state;
    const { toggleForm, toggleOptions } = this;

    return (
      <home>
        {options_component}
        <TopBar toggleOptions={toggleOptions} />
        <Filters />
        {show_form && <Form toggleForm={toggleForm} />}
        <Lists />
        {!show_form && <AddButton toggleForm={toggleForm} />}
      </home>
    );
  }
};

export default connect(state => {
  return {
    user_id: getUserId(state)
  };
})(Home);
