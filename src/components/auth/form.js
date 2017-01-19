import React from 'react';

export default (props) => {
  return (
    <auth-form>
      <input type="text" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <img src="images/submit-ok.svg" id="auth-form-submit-ok" />
    </auth-form>
  );
};
