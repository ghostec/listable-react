import React from 'react';
import { connect } from 'react-redux';
import { bindAll } from 'lodash';

import 'styles/auth';

import RedirectTo from './redirect_to';
import Form from 'containers/common/form';
import Header from 'components/auth/header';
import SignInForm from 'components/auth/form/sign_in';
import SignUpForm from 'components/auth/form/sign_up';
import ForgotPasswordForm from 'components/auth/form/forgot_password';
import SignInFooter from 'components/auth/footer/sign_in';
import SignUpFooter from 'components/auth/footer/sign_up';
import ForgotPasswordFooter from 'components/auth/footer/forgot_password';
import Spinner from 'components/common/spinner';
import { signIn as sessionSignIn, signUp as sessionSignUp } from 'actions/session';

const signIn = async (dispatch, email, password) => {
  await dispatch(sessionSignIn(email, password));
} 

const signUp = async (dispatch, name, email, password) => {
  await dispatch(sessionSignUp(name, email, password));
} 

class Auth extends Form {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      form: {
        name: '',
        email: '',
        password: ''
      },
      form_header: 'Sign In',
      FormComponent: SignInForm,
      Footer: SignInFooter
    };

    bindAll(this, 'handleSubmit', 'showSignIn', 'showSignUp', 'showForgotPassword');
  }

  async handleSubmit(event) {
    event.preventDefault()

    const { form, FormComponent } = this.state;
    const { name, email, password } = form;
    const { dispatch, showToast } = this.props;
    const { toggleProcessing } = this;

    toggleProcessing();

    try {
      if(FormComponent == SignInForm) await signIn(dispatch, email, password);
      else if(FormComponent == SignUpForm) await signUp(dispatch, name, email, password);
    } catch(err) {
      toggleProcessing();
      showToast(err.message);
    }
  }

  showSignIn() {
    this.setState({
      ...this.state,
      form_header: 'Sign In',
      FormComponent: SignInForm,
      Footer: SignInFooter
    });
  }

  showSignUp() {
    this.setState({
      ...this.state,
      form_header: 'Sign Up',
      FormComponent: SignUpForm,
      Footer: SignUpFooter
    });
  }

  showForgotPassword() {
    this.setState({
      ...this.state,
      form_header: 'Forgot Password',
      FormComponent: ForgotPasswordForm,
      Footer: ForgotPasswordFooter
    });
  }

  componentDidMount() {
    document.title = 'Listavel';
    this.showSignIn();
  }

  render() {
    const { token } = this.props;
    if(token) return <RedirectTo location='home' />;

    const { handleSubmit, handleChange, showForgotPassword, showSignIn, showSignUp } = this;
    const { processing, FormComponent, Footer, form, form_header } = this.state;

    return (
      <auth>
        <auth-wrap>
          <Header form_header={form_header}/>
          <auth-form>
            <form onSubmit={handleSubmit}>
              <FormComponent form={form} handleChange={handleChange} />
              {!processing && <input id="auth-form-submit-ok" type="submit" value="" />}
              {processing && <Spinner />}
            </form>
          </auth-form>
        </auth-wrap>
        <Footer showForgotPassword={showForgotPassword} showSignIn={showSignIn} showSignUp={showSignUp} />
      </auth>
    );
  }
};

export default connect(state => {
  return {
    token: state.session.get('token')
  }
})(Auth);
