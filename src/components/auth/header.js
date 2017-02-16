import React from 'react';

const Header = (props) => {
  const { form_header } = props;

  return (
    <auth-header>
      <auth-header-logo>Listavel</auth-header-logo>
      <auth-header-description>create share learn</auth-header-description>
      <auth-header-state>{form_header}</auth-header-state>
    </auth-header>
  );
};

export default Header;
