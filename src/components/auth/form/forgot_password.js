import React from 'react';

export default (props) => {
  const { email } = props.form;
  const { handleChange, handleSubmit } = props;
  return (
    <auth-form>
      <form onSubmit={handleSubmit}>
        <input id="email" type="text" placeholder="Email" autoComplete="off" value={email} onChange={handleChange} />
        <input id="auth-form-submit-ok" type="submit" value="" />
      </form>
    </auth-form>
  );
};
