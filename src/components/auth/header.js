import React from 'react';

const Header = (props) => {
  const { show_sign_in, show_sign_up, show_forgot_password } = props;

  let state_text;
  if(show_sign_in) state_text = 'Sign In';
  else if(show_sign_up) state_text = 'Sign Up';
  else state_text = 'Forgot Password';

  return (
    <auth-header>
      <auth-header-logo>Listavel</auth-header-logo>
      <auth-header-description>create share learn</auth-header-description>
      <auth-header-state>{state_text}</auth-header-state>
    </auth-header>
  );
};

export default Header;
