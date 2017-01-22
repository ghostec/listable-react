import React from 'react';

export default (props) => {
  const { email, password } = props.form;
  const { handleChange, handleSubmit } = props;
  return (
    <auth-form>
      <form onSubmit={handleSubmit}>
        <input id="email" type="text" placeholder="Email" autoComplete="off" value={email} onChange={handleChange} />
        <input id="password" type="password" placeholder="Password" value={password} onChange={handleChange} />
        <input id="auth-form-submit-ok" type="submit" value="" />
      </form>
    </auth-form>
  );
};
