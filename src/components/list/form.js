import React from 'react';

export default (props) => {
  const { url } = props.form;
  const { handleSubmit, handleChange, toggleShow } = props;

  return (
    <quick-add-form>
      <form onSubmit={handleSubmit}>
        <input id="url" type="text" placeholder="paste URL" value={url} onChange={handleChange} />
        <quick-add-form-close onClick={toggleShow}/>
        <input id="quick-add-form-submit" type="submit" value="" />
      </form>
    </quick-add-form>
  );
}
