import React from 'react';

import TopBar from '../components/home/topbar';
import Filters from '../components/home/filters';
import Lists from '../components/home/lists';
import Form from '../components/home/form';
import CreateListButton from '../components/home/create_list_button';
import * as lists from '../actions/lists';

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

  render() {
    return (
      <home>
        <TopBar />
        <Filters />
        {this.state.show_form && <Form toggleShow={this.toggleShow}/>}
        <Lists />
        {!this.state.show_form && <CreateListButton toggleShow={this.toggleShow} />}
      </home>
    );
  }
};

export default Home;
