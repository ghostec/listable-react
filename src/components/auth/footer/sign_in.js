import React from 'react';

export default (props) => {
  return (
    <auth-footer>
      <auth-footer-forgot onClick={props.showForgotPassword}>Forgot password?</auth-footer-forgot>
      <auth-footer-sign-in-up onClick={props.showSignUp}>Sign up</auth-footer-sign-in-up>
    </auth-footer>
  );
};
