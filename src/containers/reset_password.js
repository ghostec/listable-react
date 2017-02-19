import React from 'react';
import { connect } from 'react-redux';
import { bindAll } from 'lodash';

import 'styles/auth';

import RedirectTo from './redirect_to';
import Form from 'containers/common/form';
import Header from 'components/auth/header';
import Spinner from 'components/common/spinner';
import { resetPassword } from 'actions/users';

class ResetPassword extends Form {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      password: ''
    };

    bindAll(this, 'handleSubmit');
  }

  async handleSubmit(event) {
    event.preventDefault()

    const { password } = this.state;
    const { dispatch, showToast } = this.props;
    const { t, u } = this.props.params;
    const { toggleProcessing } = this;

    toggleProcessing();

    try {
      await resetPassword(u, t, password)
      toggleProcessing();
      showToast('Done!');
    } catch(err) {
      toggleProcessing();
      showToast(err.message);
    }
  }

  componentDidMount() {
    document.title = 'Reset your password - Listavel';
  }

  render() {
    const { token } = this.props;
    if(token) return <RedirectTo location='/home' />;

    const { handleSubmit, handleChange } = this;
    const { processing, password } = this.state;

    return (
      <auth>
        <auth-wrap>
          <Header form_header='Reset password'/>
          <auth-form>
            <form onSubmit={handleSubmit}>
              <input id="password" type="password" placeholder="New password" autoComplete="off" value={password} onChange={handleChange} />
              {!processing && <input id="auth-form-submit-ok" type="submit" value="" />}
              {processing && <Spinner />}
            </form>
          </auth-form>
        </auth-wrap>
      </auth>
    );
  }
};

import { getURLParams } from 'selectors/navigation';

export default connect(state => {
  return {
    token: state.session.get('token'),
    params: getURLParams(state)
  }
})(ResetPassword);

