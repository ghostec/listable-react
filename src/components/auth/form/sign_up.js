import React from 'react';

export default (props) => {
  const { name, email, password } = props.form;
  const { handleChange, handleSubmit } = props;

  return (
    <div>
      <input id="name" type="text" placeholder="Name" autoComplete="off" value={name} onChange={event => handleChange(event, 'form')} />
      <input id="email" type="text" placeholder="Email" autoComplete="off" value={email} onChange={event => handleChange(event, 'form')} />
      <input id="password" type="password" placeholder="Password" value={password} onChange={event => handleChange(event, 'form')} />
    </div>
  );
};
