import React from 'react';
import { connect } from 'react-redux';
import update from 'react-addons-update';

import '../styles/home';

import TopBar from './home/topbar';
import Lists from './home/lists';
import Form from './home/form';
import Filters from '../components/home/filters';
import AddButton from '../components/common/add_button';

class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      show_form: false
    };

    this.toggleForm = this.toggleForm.bind(this);
  }

  toggleForm() {
    this.setState({
      ...this.state,
      show_form: !this.state.show_form
    });
  }

  render() {
    const { lists } = this.props;
    const { show_form } = this.state;
    const { toggleForm} = this;

    return (
      <home>
        <TopBar/>
        <Filters />
        {show_form && <Form toggleForm={toggleForm} />}
        <Lists />
        {!show_form && <AddButton toggleForm={toggleForm} />}
      </home>
    );
  }
};

export default Home;
