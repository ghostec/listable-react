import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import '../styles/list';

import Items from './list/items';
import Form from './list/form';
import TopBar from './list/topbar';
import Info from '../components/list/info';
import AddButton from '../components/common/add_button';
import Options from './list/options';

class List extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      show_form: false,
      show_options: false,
      options_item: null
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
  
  toggleOptions(event, item) {
    this.setState({
      ...this.state,
      show_options: !this.state.show_options,
      options_item: item
    });
  }
  
  render() {
    const { toggleForm, toggleOptions } = this;
    const { options_item, show_form, show_options } = this.state;
    const { list, list_items } = this.props;

    return (
      <div>
        {show_options && <Options item={options_item} toggleOptions={toggleOptions} />}
        <list>
          <TopBar back={back} n_items={list_items.length} />
          <Info list={list} />
          {show_form && <Form list={list} toggleForm={toggleForm} />}
          <Items list_items={list_items} toggleOptions={toggleOptions}/>
          {!show_form && <AddButton toggleForm={toggleForm} />}
        </list>
      </div>
    );
  }
};

const mapStateToProps = state => {
  const list_id = state.navigation.get('location').options.id;
  const list = state.lists.get(list_id).toJS();
  
  const list_items = state.list_items.toJS();
  const sorted = _.map(list_items, v => v).sort((a, b) => {
    return (a.updated_at < b.updated_at ? 1 : -1)
  });

  return {
    list,
    list_items: sorted
  };
}

export default connect(mapStateToProps)(List);
