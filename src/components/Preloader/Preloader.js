import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Translate, withLocalize } from 'react-localize-redux';
import translations from '../../translations/preloader.json';
import './Preloader.scss';

class Preloader extends PureComponent {
  static propTypes = {
    pastDelay: PropTypes.bool,
    message: PropTypes.string,
    // eslint-disable-next-line react/require-default-props
    addTranslation: PropTypes.func,
  };

  static defaultProps = {
    pastDelay: null,
    message: '',
  };

  constructor(props) {
    super(props);
    const { addTranslation } = this.props;
    addTranslation(translations);
  }

  render() {
    const { pastDelay, message } = this.props;
    if (pastDelay || pastDelay === null) {
      return (
        <div className="preloader">
          <p>
            {message !== ''
              ? message
              : <Translate id="preloader.messageDefault" />
            }
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </p>
        </div>
      );
    }
    return null;
  }
}
export default withLocalize(Preloader);
