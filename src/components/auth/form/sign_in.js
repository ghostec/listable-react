import React from 'react';

export default (props) => {
  const { email, password } = props.form;
  const { handleChange } = props;

  return (
    <div>
      <input id="email" type="text" placeholder="Email" autoComplete="off" value={email} onChange={event => handleChange(event, 'form')} />
      <input id="password" type="password" placeholder="Password" value={password} onChange={event => handleChange(event, 'form')} />
    </div>
  );
};
