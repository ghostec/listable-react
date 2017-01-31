import React from 'react';

import '../../../styles/options';

import Form from './form';
import Options from '../../../components/home/options';

class OptionsContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { toggleOptions, dispatch } = this.props;

    return (
      <options-bg onClick={(event) => toggleOptions(event)}>
        <options>
          <Form />
          <Options toggleOptions={toggleOptions} dispatch={dispatch} />
        </options>
      </options-bg>
    );
  }
}

export default OptionsContainer;
