import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import '../styles/list';

import Items from './list/items';
import Form from './list/form';
import TopBar from './list/topbar';
import Info from '../components/list/info';
import AddButton from '../components/common/add_button';

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
  
  render() {
    const { toggleForm, toggleOptions } = this;
    const { show_form, options_component } = this.state;
    const { list, n_items, dispatch } = this.props;

    if(_.isEmpty(list)) return (<div>loading...</div>);
    
    return (
      <list>
        {options_component}
        <TopBar n_items={n_items} />
        <Info list={list} toggleOptions={toggleOptions} dispatch={dispatch} />
        {show_form && <Form list={list} toggleForm={toggleForm} />}
        <Items toggleOptions={toggleOptions}/>
        {(list.owner && !show_form) && <AddButton toggleForm={toggleForm} />}
      </list>
    );
  }
};

import { getList, getListSize } from '../selectors/lists';

const mapStateToProps = state => {
  return {
    list: getList(state),
    n_items: getListSize(state)
  };
}

export default connect(mapStateToProps)(List);
