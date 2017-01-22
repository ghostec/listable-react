import React from 'react';

export default (props) => {
  return (
    <auth-footer>
      <auth-footer-forgot onClick={props.showForgotPassword}>Forgot password?</auth-footer-forgot>
      <auth-footer-sign-in-up onClick={props.showSignIn}>Sign in</auth-footer-sign-in-up>
    </auth-footer>
  );
};
