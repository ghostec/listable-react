import React from 'react';

export default (props) => {
  return (
    <auth-footer>
      <auth-footer-sign-in-up onClick={props.showSignIn}>Sign in</auth-footer-sign-in-up>
      <auth-footer-sign-in-up onClick={props.showSignUp}>Sign up</auth-footer-sign-in-up>
    </auth-footer>
  );
};
