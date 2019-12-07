import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './InputPH.scss';

class InputPH extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    inputParams: PropTypes.objectOf(String),
    inputEvents: PropTypes.objectOf(String),
    placeholder: PropTypes.oneOfType(
      PropTypes.objectOf(String),
      PropTypes.string,
    ),
    feedback: PropTypes.string,
    feedbackType: PropTypes.string,
    feedbackStyle: PropTypes.objectOf(String),
  };

  static defaultProps = {
    loading: false,
    inputParams: null,
    inputEvents: null,
    placeholder: null,
    feedback: null,
    feedbackType: null,
    feedbackStyle: null,
  };

  constructor(props) {
    super(props);
    this.inputPH = React.createRef();
  }

  componentDidMount() {
    this.checkInput();
  }

  componentDidUpdate() {
    this.checkInput();
  }

  checkInput() {
    const inputPH = this.inputPH.current.firstChild;
    const className = 'input-ph__input_up';
    const classList = inputPH.className.split(' ');
    if (inputPH.value.length > 0) {
      if (classList.indexOf(className) === -1) {
        inputPH.className += ` ${className}`;
      }
    } else {
      inputPH.className = inputPH.className.replace(new RegExp(`\\b${className}\\b`, 'g'), '');
    }
  }

  render() {
    const {
      loading,
      inputParams,
      inputEvents,
      placeholder,
      feedback,
      feedbackStyle,
      feedbackType,
    } = this.props;
    return (
      <label
        ref={this.inputPH}
        className={`input-ph${(loading) ? ' input-ph_loading' : ''}`}
        htmlFor={inputParams.name}
      >
        <input
          {...inputParams}
          {...inputEvents}
        />
        {
          (placeholder)
            ? <p className="input-ph__text">{placeholder}</p>
            : ''
        }
        {
          (feedback)
            ? <p style={feedbackStyle} className={`input-ph__feedback ${feedbackType}`}>{feedback}</p>
            : ''
        }
      </label>
    );
  }
}

export default InputPH;
