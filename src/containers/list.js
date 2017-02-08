import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import 'styles/list';

import * as lists from 'actions/lists';
import * as users from 'actions/users';
import * as list_items from 'actions/list_items';
import * as user_list_items from 'actions/user_list_items';
import Items from './list/items';
import Form from './list/form';
import TopBar from './list/topbar';
import Options from 'components/list/options/list';
import AddButton from 'components/common/add_button';
import ListInfo from 'components/common/list_info';

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
    const { list_id, user_id, dispatch } = this.props;
    dispatch(lists.get(list_id));
    dispatch(users.get(user_id));
    dispatch(list_items.fromList(list_id));
    dispatch(user_list_items.fromList(list_id));
  }
  
  render() {
    const { toggleForm, toggleOptions } = this;
    const { show_form, options_component } = this.state;
    const { user, list, n_items, dispatch } = this.props;

    if(_.isEmpty(list)) return (<div>loading...</div>);
    
    return (
      <list>
        {options_component}
        <TopBar n_items={n_items} />
        <vertical-20px />
        <ListInfo list={list} user={(user._id != list._userId) && user} onClickHandler={event => listClickHandler(event, {
          dispatch, toggleOptions, list
        })}/>
        {show_form && <Form list={list} toggleForm={toggleForm} />}
        <Items toggleOptions={toggleOptions}/>
        {(list.owner && !show_form) && <AddButton toggleForm={toggleForm} />}
      </list>
    );
  }
};

const listClickHandler = (event, props) => {
  const { dispatch, toggleOptions, list } = props;
  const OptionsComponent = <Options toggleOptions={toggleOptions} dispatch={dispatch} list={list} />;
  toggleOptions(event, OptionsComponent);
}

import { getList, getListSize } from 'selectors/lists';
import { getResourceId } from 'selectors/navigation';
import { getUserId } from 'selectors/session';
import { getUser } from 'selectors/users';

export default connect(state => {
  return {
    list_id: getResourceId(state),
    user_id: getUserId(state),
    list: getList(state),
    n_items: getListSize(state),
    init: function() {
      this.user = getUser(state, this.list && this.list._userId);
      return this;
    }
  }.init();
})(List);
