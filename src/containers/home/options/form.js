import React from 'react';
import { connect } from 'react-redux';
import update from 'react-addons-update';
import { bindAll } from 'lodash';

import * as common from '../../../helpers/common';
import { getCurrentUser } from '../../../selectors/users';

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
    const reader = new FileReader();
    const file = event.target.files[0];

    reader.onload = (upload) => {
      this.setState({
        data_uri: upload.target.result,
        filename: file.name,
        filetype: file.type,
        show_submit: true
      });
    };

    reader.readAsDataURL(file);
  }

  handleSubmit(event) {
    const { filename, filetype, data_uri } = this.state;
    const { dispatch } = this.props;

    fetch(`${common.apiPath}/aws/s3/policy/profile`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        filename,
        filetype
      })
    }).then(response => {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    }).then(({ url, key }) => {
      const buf = new Buffer(data_uri.replace(/^data:image\/\w+;base64,/, ''), 'base64');

      fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Length': buf.length,
          'Content-Type': filetype,
          'x-amz-acl': 'public-read'
        },
        body: buf
      }).then(response => {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        // UPDATE USER PICTURE
      })
    })

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
          <input id='picture' type='file' ref='inputPicture' style={{display: 'none'}} onChange={handleFile} />
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
