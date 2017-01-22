import React from 'react';
import update from 'react-addons-update';
import { connect } from 'react-redux';

import "../styles/auth";

import RedirectTo from './redirect_to';
import Header from '../components/auth/header';
import SignInForm from '../components/auth/form/sign_in';
import SignUpForm from '../components/auth/form/sign_up';
import ForgotPasswordForm from '../components/auth/form/forgot_password';
import SignInFooter from '../components/auth/footer/sign_in';
import SignUpFooter from '../components/auth/footer/sign_up';
import ForgotPasswordFooter from '../components/auth/footer/forgot_password';
import * as session from '../actions/session';

class Auth extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      form: {
        name: '',
        email: '',
        password: ''
      },
      show_sign_in: true,
      show_sign_up: false,
      show_forgot_password: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showSignIn = this.showSignIn.bind(this);
    this.showSignUp = this.showSignUp.bind(this);
    this.showForgotPassword = this.showForgotPassword.bind(this);
  }

  handleChange(event) {
    const newState = update(this.state, {
      form: { [event.target.id]: {$set: event.target.value} }
    });
    this.setState(newState);
  }

  handleSubmit(event) {
    const { name, email, password } = this.state.form

    if(this.state.show_sign_in) {
      this.props.dispatch(session.signIn(email, password))
    }
    else if(this.state.show_sign_up) {
      this.props.dispatch(session.signUp(name, email, password))
    }

    event.preventDefault()
  }

  showSignIn() {
    this.setState({
      ...this.state,
      show_sign_in: true,
      show_sign_up: false,
      show_forgot_password: false
    });
  }

  showSignUp() {
    this.setState({
      ...this.state,
      show_sign_in: false,
      show_sign_up: true,
      show_forgot_password: false
    });
  }

  showForgotPassword() {
    this.setState({
      ...this.state,
      show_sign_in: false,
      show_sign_up: false,
      show_forgot_password: true
    });
  }

  render() {
    const token = this.props.session.get('token');
    if(token != undefined) return <RedirectTo location='home' />

    return (
      <auth>
        <auth-wrap>
          <Header />
          {this.state.show_sign_in && <SignInForm form={this.state.form} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />}
          {this.state.show_sign_up && <SignUpForm form={this.state.form} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />}
          {this.state.show_forgot_password && <ForgotPasswordForm form={this.state.form} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />}
        </auth-wrap>
        {this.state.show_sign_in && <SignInFooter showForgotPassword={this.showForgotPassword} showSignUp={this.showSignUp} />}
        {this.state.show_sign_up && <SignUpFooter showForgotPassword={this.showForgotPassword} showSignIn={this.showSignIn} />}
        {this.state.show_forgot_password && <ForgotPasswordFooter showSignIn={this.showSignIn} showSignUp={this.showSignUp} />}
      </auth>
    );
  }
};

export default connect(state => state)(Auth);
