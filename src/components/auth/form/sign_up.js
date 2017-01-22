import React from 'react';

export default (props) => {
  const { name, email, password } = props.form;
  const { handleChange, handleSubmit } = props;
  return (
    <auth-form>
      <form onSubmit={handleSubmit}>
        <input id="name" type="text" placeholder="Name" autoComplete="off" value={name} onChange={handleChange} />
        <input id="email" type="text" placeholder="Email" autoComplete="off" value={email} onChange={handleChange} />
        <input id="password" type="password" placeholder="Password" value={password} onChange={handleChange} />
        <input id="auth-form-submit-ok" type="submit" value="" />
      </form>
    </auth-form>
  );
};
