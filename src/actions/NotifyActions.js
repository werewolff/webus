import { ADD_NOTIFICATION, REMOVE_ALL_NOTIFICATIONS, REMOVE_NOTIFICATION } from '../constants/notify';

export function createNotification(notification) {
  return {
    type: ADD_NOTIFICATION,
    notification: {
      ...notification,
      id: Date.now(),
    },
  };
}

export function removeNotification(id) {
  return {
    type: REMOVE_NOTIFICATION,
    id,
  };
}

export function removeAllNotifications() {
  return {
    type: REMOVE_ALL_NOTIFICATIONS,
  };
}
