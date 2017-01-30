import React from 'react';
import { connect } from 'react-redux';
import update from 'react-addons-update';
import { bindAll, isEmpty } from 'lodash';

import Spinner from '../../../components/common/spinner';
import * as common from '../../../helpers/common';
import { profilePicturePath } from '../../../helpers/s3';
import { getCurrentUser } from '../../../selectors/users';
import * as s3 from '../../../actions/s3';

class Form extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      show_submit: false,
      processing: false
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
      ...this.state,
      file: file,
      show_submit: true
    });

    const reader = new FileReader();

    reader.onload = event => {
      const { userPicture } = this.refs;
      userPicture.src = event.target.result;
    }

    reader.readAsDataURL(file);
  }

  handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    const { file, filename, processing } = this.state;
    const { dispatch, user } = this.props;

    if(processing) return;

    this.setState({
      ...this.state,
      processing: true
    });

    dispatch(s3.uploadProfilePicture(file)).then(() => {
      this.setState({
        show_submit: false,
        processing: false
      });
    });
  }

  selectPicture(event, inputElement) {
    event.stopPropagation();

    const { processing } = this.state;
    if(processing) return;

    const { inputPicture } = this.refs;
    inputPicture.click();
  }

  render() {
    const { show_submit, processing, file } = this.state;
    const { dispatch, user } = this.props;
    const { handleSubmit, handleFile, selectPicture } = this;

    return (
      <options-wrap>
        <upload-profile-picture onClick={selectPicture}>
          <img ref={'userPicture'} src={isEmpty(user.picture) ? 'images/upload-profile-picture.svg' : profilePicturePath(user, 'medium')} />
        </upload-profile-picture>
        <form onSubmit={handleSubmit}>
          <input type='file' ref='inputPicture' style={{display: 'none'}} onChange={handleFile} />
        </form>
        {processing && <Spinner />}
        {(show_submit && !processing) && <options-option-yellow onClick={handleSubmit}>Upload picture</options-option-yellow>}
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
