import React from 'react';
import { connect } from 'react-redux';
import update from 'react-addons-update';

import TopBar from '../components/list/topbar';
import Info from '../components/list/info';
import Items from '../components/list/items';
import CreateListButton from '../components/home/create_list_button';
import * as lists from '../actions/lists';
import * as session from '../actions/session';
import * as navigation from '../actions/navigation';

class List extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      form: {
        url: ''
      },
      show_form: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
    this.back = this.back.bind(this);
  }

  handleChange(event) {
    var newState = update(this.state, {
      form: { [event.target.id]: {$set: event.target.value} }
    });
    this.setState(newState);
  }

  handleSubmit(event) {
    const { name } = this.state.form;
    this.props.dispatch(lists.create(name));
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

  render() {
    return (
      <list>
        <TopBar back={this.back}/>
        <Info list={this.props.list} />
        <Items list_items={this.props.list_items} />
      </list>
    );
  }
};

const mapStateToProps = state => {
  const list_id = state.navigation.get('location').options.id;
  const list = state.lists.get(list_id);

  return {
    list,
    list_items: state.list_items
  };
}

export default connect(mapStateToProps)(List);

