import React from 'react';
import { connect } from 'react-redux';
import update from 'react-addons-update';

import '../styles/home';

import TopBar from '../components/home/topbar';
import Filters from '../components/home/filters';
import Lists from '../components/home/lists';
import Form from '../components/home/form';
import AddButton from '../components/common/add_button';
import * as lists from '../actions/lists';
import * as session from '../actions/session';
import redirect from '../helpers/redirect';

class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      form: {
        name: ''
      },
      show_form: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
    this.signOut = this.signOut.bind(this);
    this.goToList = this.goToList.bind(this);
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

  signOut() {
    this.props.dispatch(session.signOut());
  }

  goToList(list) {
    redirect(`list/${list._id}`);
  }

  render() {
    return (
      <home>
        <TopBar signOut={this.signOut}/>
        <Filters />
        {this.state.show_form && <Form form={this.state.form} toggleShow={this.toggleShow} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />}
        <Lists lists={this.props.lists} goToList={this.goToList} />
        {!this.state.show_form && <AddButton toggleShow={this.toggleShow} />}
      </home>
    );
  }
};

export default connect(state => state)(Home);
