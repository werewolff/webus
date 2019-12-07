import * as constUser from '../constants/user';
import { deleteCookie } from '../utils/Cookie';
import { COOKIE_TOKEN_NAME } from '../Settings';
import ajax from '../utils/Ajax';

// Получение данных пользователя
export function getUser(token) {
  return (dispatch) => {
    dispatch({
      type: constUser.USER_GET_REQUEST,
    });
    ajax('self_data', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(data => dispatch({
        type: constUser.USER_GET_SUCCESS,
        payload: data.data,
      }))
      .catch((error) => {
        dispatch({
          type: constUser.USER_GET_ERROR,
          payload: error,
        });
      });
  };
}

// Выход
export function logOut() {
  deleteCookie(COOKIE_TOKEN_NAME);
  return {
    type: constUser.USER_LOGOUT,
  };
}

// Очищение ошибок
export function clearError() {
  return {
    type: constUser.USER_ERROR_CLEAR,
  };
}
