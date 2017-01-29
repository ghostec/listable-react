import React from 'react';
import { connect } from 'react-redux';
import update from 'react-addons-update';
import { bindAll } from 'lodash';

import * as common from '../../../helpers/common';
import { getCurrentUser } from '../../../selectors/users';
import * as s3 from '../../../actions/s3';

class Form extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      show_submit: false
    }

    bindAll(this, 'handleFile', 'handleSubmit', 'selectPicture');
  }

  componentDidMount() {
    const { inputPicture } = this.refs;

    inputPicture.addEventListener('click', event => event.stopPropagation());
  }

  componentWillUnmount() {
    const { inputPicture } = this.refs;

    inputPicture.removeEventListener('click', event => event.stopPropagation());
  }

  handleFile(event) {
    const file = event.target.files[0];

    this.setState({
      file: file,
      show_submit: true
    });
  }

  handleSubmit(event) {
    const { file, filename } = this.state;
    const { dispatch, user } = this.props;

    dispatch(s3.uploadProfilePicture(file));

    event.preventDefault();
    event.stopPropagation();
  }

  selectPicture(event, inputElement) {
    const { inputPicture } = this.refs;

    inputPicture.click();
    event.stopPropagation();
  }

  render() {
    const { show_submit } = this.state;
    const { dispatch } = this.props;
    const { handleSubmit, handleFile, selectPicture } = this;

    return (
      <options-wrap>
        <options-option onClick={selectPicture}>Select picture</options-option>
        <form onSubmit={handleSubmit}>
          <input type='file' ref='inputPicture' style={{display: 'none'}} onChange={handleFile} />
          {show_submit && <input id='submit' type='submit' value='submit' onClick={handleSubmit} />}
        </form>
      </options-wrap>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: getCurrentUser(state)
  };
}

export default connect(mapStateToProps)(Form);
