import React from 'react';

import 'styles/topbar';

import Options from 'containers/home/options/options';
import routes from 'constants/routes';
import redirect from 'helpers/redirect';

const goToSearch = () => {
  redirect(routes.generate('search'));
}

export default (props) => {
  const { toggleOptions, dispatch } = props;

  const options_component = <Options toggleOptions={toggleOptions} dispatch={dispatch} />;

  return (
    <topbar>
      <topbar-wrap>
        <topbar-content>
          <topbar-left>
            <img src="images/more.svg" onClick={event => toggleOptions(event, options_component)} />
          </topbar-left>
          <topbar-center>
            Listable
          </topbar-center>
          <topbar-right>
            <img src="images/search.svg" onClick={goToSearch} />
          </topbar-right>
        </topbar-content>
      </topbar-wrap>
    </topbar>
  );
};
