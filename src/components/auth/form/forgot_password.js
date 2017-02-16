import React from 'react';

export default (props) => {
  const { email } = props.form;
  const { handleChange } = props;

  return (
    <input id="email" type="text" placeholder="Email" autoComplete="off" value={email} onChange={event => handleChange(event, 'form')} />
  );
};
