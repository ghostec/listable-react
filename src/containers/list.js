import React from 'react';
import { connect } from 'react-redux';
import update from 'react-addons-update';

import '../styles/list';

import TopBar from '../components/list/topbar';
import Info from '../components/list/info';
import Items from '../components/list/items';
import Form from '../components/list/form';
import AddButton from '../components/common/add_button';
import Options from '../components/list/options';
import * as list_items from '../actions/list_items';
import * as navigation from '../actions/navigation';
import _ from 'lodash';

class List extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      form: {
        url: ''
      },
      show_form: false,
      show_options: false,
      options_item: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
    this.back = this.back.bind(this);
    this.toggleListItemDone = this.toggleListItemDone.bind(this);
    this.toggleOptions = this.toggleOptions.bind(this);
    this.goToURL = this.goToURL.bind(this);
  }

  handleChange(event) {
    var newState = update(this.state, {
      form: { [event.target.id]: {$set: event.target.value} }
    });
    this.setState(newState);
  }

  handleSubmit(event) {
    const { url } = this.state.form;
    this.props.dispatch(list_items.create(this.props.list._id, url));
    event.preventDefault();
  }

  toggleShow() {
    this.setState({
      ...this.state,
      show_form: !this.state.show_form
    });
  }

  back() {
    this.props.dispatch(navigation.backBegin());
  }

  toggleListItemDone(event, list_item) {
    this.props.dispatch(list_items.toggleDone(list_item));
    event.stopPropagation();
  }
  
  toggleOptions(event, item) {
    this.setState({
      ...this.state,
      show_options: !this.state.show_options,
      options_item: item
    });
  }

  goToURL(event, item) {
    window.open(item.url);
    event.stopPropagation();
  }

  render() {
    return (
      <div>
      {this.state.show_options && <Options item={this.state.options_item} toggleOptions={this.toggleOptions} goToURL={this.goToURL} />}
      <list>
        <TopBar back={this.back} n_items={this.props.list_items.length} />
        <Info list={this.props.list} />
        {this.state.show_form && <Form form={this.state.form} toggleShow={this.toggleShow} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />}
        <Items list_items={this.props.list_items} toggleDone={this.toggleListItemDone} toggleOptions={this.toggleOptions}/>
        {!this.state.show_form && <AddButton toggleShow={this.toggleShow} />}
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
