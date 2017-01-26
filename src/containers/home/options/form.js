import React from 'react';
import { connect } from 'react-redux';
import update from 'react-addons-update';

class Form extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      picture: '',
      show_submit: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectPicture = this.selectPicture.bind(this);
  }

  componentDidMount() {
    const { inputPicture } = this.refs;

    inputPicture.addEventListener('click', event => event.stopPropagation());
  }

  componentWillUnmount() {
    const { inputPicture } = this.refs;

    inputPicture.removeEventListener('click', event => event.stopPropagation());
  }

  handleChange(event) {
    var newState = update(this.state, {
      [event.target.id]: {$set: event.target.value}
    });
    this.setState(newState);
  }

  handleSubmit(event) {
    const { picture } = this.state;
    const { dispatch } = this.props;

    //dispatch(list_items.create(list._id, url));
    event.preventDefault();
  }

  selectPicture(event, inputElement) {
    const { inputPicture } = this.refs;

    inputPicture.click();
    event.stopPropagation();
  }

  render() {
    const { picture, show_submit } = this.state;
    const { dispatch } = this.props;
    const { handleSubmit, handleChange, selectPicture } = this;

    return (
      <options-wrap>
        <options-option onClick={selectPicture}>Select picture</options-option>
        <form onSubmit={handleSubmit}>
          <input id='picture' type='file' ref='inputPicture' style={{display: 'none'}} value={picture} onChange={handleChange} />
          {show_submit && <input id='submit' type='submit' value='' />}
        </form>
      </options-wrap>
    );
  }
}

export default connect()(Form);
