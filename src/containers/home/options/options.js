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
      <options onClick={(event) => toggleOptions(event)}>
        <Form />
        <Options toggleOptions={toggleOptions} dispatch={dispatch} />
      </options>
    );
  }
}

export default OptionsContainer;
