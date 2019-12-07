import { ADD_NOTIFICATION, REMOVE_ALL_NOTIFICATIONS, REMOVE_NOTIFICATION } from '../constants/notify';

const initialState = [];

export default function notify(state = initialState, action) {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return [...state, action.notification];
    case REMOVE_NOTIFICATION:
      return state.filter(item => item.id !== action.id);
    case REMOVE_ALL_NOTIFICATIONS:
      return [];
    default:
      return state;
  }
}