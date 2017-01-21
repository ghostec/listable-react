import React from 'react';
import update from 'react-addons-update';
import { connect } from 'react-redux';

import "../styles/auth";

import RedirectTo from './redirect_to';
import Header from '../components/auth/header';
import Form from '../components/auth/form';
import Footer from '../components/auth/footer';
import * as session from '../actions/session';

class Auth extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      form: {
        email: '',
        password: ''
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    var newState = update(this.state, {
      form: { [event.target.id]: {$set: event.target.value} }
    });
    this.setState(newState);
  }

  handleSubmit(event) {
    const { email, password } = this.state.form
    this.props.dispatch(session.signIn(email, password))
    event.preventDefault()
  }

  render() {
    const token = this.props.session.get('token');
    if(token != undefined) return <RedirectTo location='home' />

    return (
      <auth>
        <Header />
        <Form form={this.state.form} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
        <Footer />
      </auth>
    );
  }
};

export default connect(state => state)(Auth);
