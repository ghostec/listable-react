import React from 'react';
import { bindAll } from 'lodash';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      processing: false
    };

    bindAll(this, 'handleChange', 'toggleProcessing');
  }

  toggleProcessing() {
    const { processing } = this.state;

    this.setState({
      ...this.state,
      processing: !processing
    });
  }

  handleChange(event, path) {
    if(path) {
      const newPath = {
        ...this.state[path],
        [event.target.id]: event.target.value
      };
      this.setState({
        ...this.state,
        [path]: newPath
      });
    } else {
      this.setState({
        ...this.state,
        [event.target.id]: event.target.value
      }); 
    }
  }
}

export default Form;
