/* eslint-disable react/forbid-prop-types */
import { hot } from 'react-hot-loader/root';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { removeNotification } from '../../actions/NotifyActions';
import { Notification } from '../../components/Notification/Notification';
import './Notify.scss';

/*
 * Модуль уведомлений
 *
 * Использование:
 * В проект импортируем и рендерим модуль где нужно: <Notify />
 * Для создания уведомления вызываем action: createNotification({
 *   message: '', - сообщение,
 *   header: '', - заголовок,
 *   canClose: '', - Добавляет возможность закрытия. default: true
 *   type: NOTIFICATION_TYPE_ERROR, - импортируем тип из /constants/notify
 *   duration: 0, - Через сколько удалится уведомление. default: 3000
 * })
 *
 * */

class Notify extends PureComponent {
  static propTypes = {
    notifications: PropTypes.array,
    transitionDurations: PropTypes.shape({
      enter: PropTypes.number,
      leave: PropTypes.number,
    }),
    removeNotification: PropTypes.func.isRequired,
  };

  static defaultProps = {
    notifications: [],
    transitionDurations: {
      enter: 160,
      leave: 400,
    },
  };

  constructor(props) {
    super(props);
    this.removeNotify = ::props.removeNotification;
  }

  render() {
    const { notifications, transitionDurations } = this.props;
    return (
      <ReactCSSTransitionGroup
        className="notify"
        aria-live="polite"
        component="div"
        transitionName={{
          enter: 'enter',
          leave: 'leave',
        }}
        transitionEnterTimeout={transitionDurations.enter}
        transitionLeaveTimeout={transitionDurations.leave}
      >
        {notifications.map(notification => (
          <Notification
            key={notification.id}
            removeNotify={this.removeNotify}
            {...notification}
          />
        ))}
      </ReactCSSTransitionGroup>
    );
  }
}

function mapStateToProps(state) {
  return {
    notifications: state.notify,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    removeNotification: (id) => {
      dispatch(removeNotification(id));
    },
  };
}

export default hot(connect(mapStateToProps, mapDispatchToProps)(Notify));
