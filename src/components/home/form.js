import React from 'react';

export default (props) => {
  const { handleSubmit, toggleShow } = props;
  return (
    <home-create-list-form>
      <form onSubmit={handleSubmit}>
        <input id="name" type="text" placeholder="paste URL" />
        <home-create-list-form-close onClick={toggleShow}/>
        <input id="home-create-list-form-submit" type="submit" value="" />
      </form>
    </home-create-list-form>
  );
}

