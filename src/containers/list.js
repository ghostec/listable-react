import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import 'styles/list';

import * as lists from 'actions/lists';
import * as users from 'actions/users';
import * as list_items from 'actions/list_items';
import * as user_list_items from 'actions/user_list_items';
import Items from './list/items';
import Form from './list/form/create_list_item';
import TopBar from './list/topbar';
import AddButton from 'components/common/add_button';
import ListInfo from 'containers/list/list_info';
import Spinner from 'components/common/spinner';

class List extends React.Component {
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
    const { list_id, list, dispatch } = this.props;

    document.title = `${list.name} - Listavel`;

    dispatch(lists.get(list_id));
    dispatch(list_items.fromList(list_id));
    dispatch(user_list_items.fromList(list_id));
    list && dispatch(users.get(list._userId));
  }
  
  render() {
    const { toggleForm, toggleOptions } = this;
    const { show_form, options_component } = this.state;
    const { owner, list, n_items, dispatch } = this.props;

    if(!list) return <Spinner />;

    return (
      <list>
        {options_component}
        <TopBar />
        <vertical-20px />
        <ListInfo list={list} user={!list.owner && owner} toggleOptions={toggleOptions} />
        {show_form && <Form list={list} toggleForm={toggleForm} />}
        <Items toggleOptions={toggleOptions}/>
        {(list.owner && !show_form) && <AddButton toggleForm={toggleForm} />}
      </list>
    );
  }
};

import { getList, getListSize } from 'selectors/lists';
import { getResourceId } from 'selectors/navigation';
import { getUserId } from 'selectors/session';
import { getUser } from 'selectors/users';

export default connect(state => {
  return {
    list_id: getResourceId(state),
    list: getList(state),
    init: function() {
      this.owner = getUser(state, this.list && this.list._userId);
      return this;
    }
  }.init();
})(List);
