import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './Notification.scss';

export class Notification extends PureComponent {
  static propTypes = {
    id: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    header: PropTypes.string,
    canClose: PropTypes.bool,
    duration: PropTypes.number,
    removeNotify: PropTypes.func.isRequired,

  };

  static defaultProps = {
    header: '',
    canClose: true,
    duration: 3000,
  };

  componentDidMount() {
    const { removeNotify, id, duration } = this.props;
    if (duration !== 0) {
      setTimeout(() => {
        removeNotify(id);
      }, duration);
    }
  }

  render() {
    const {
      removeNotify,
      message,
      header,
      type,
      canClose,
      id,
    } = this.props;

    return (
      <div
        className={`notification-${type.toLowerCase()} toast fade show`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header">
          <i className={`notify-icon--${type.toLowerCase()}`} />
          <strong className="mr-auto">{header || type}</strong>
          {canClose ? (
            <button
              type="button"
              className="ml-2 mb-1 close"
              data-dismiss="toast"
              aria-label="Close"
              onClick={() => removeNotify(id)}
            >
              <span>&times;</span>
            </button>
          ) : ''}
        </div>
        <div className="toast-body">
          {message}
        </div>
      </div>
    );
  }
}

export default Notification;
