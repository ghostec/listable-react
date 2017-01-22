import React from 'react';

export default (props) => {
  const { name } = props.form;
  const { handleSubmit, handleChange, toggleShow } = props;

  return (
    <quick-add-form>
      <form onSubmit={handleSubmit}>
        <input id="name" type="text" placeholder="New list name" autoComplete="off" value={name} onChange={handleChange} />
        <quick-add-form-close onClick={toggleShow}/>
        <input id="quick-add-form-submit" type="submit" value="" />
      </form>
    </quick-add-form>
  );
}
