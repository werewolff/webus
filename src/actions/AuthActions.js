import * as constAuth from '../constants/auth';
import { AUTH_ERROR } from '../constants/auth';
import { isEnableCookie, setCookie } from '../utils/Cookie';
import { COOKIE_TOKEN_EXPIRES, COOKIE_TOKEN_NAME } from '../Settings';
import ajax from '../utils/Ajax';

// функция авторизации
function auth(path, code, redirectToBack) {
  return (dispatch) => {
    dispatch({
      type: constAuth.AUTH_REQUEST,
    });
    ajax(path, { body: { code } })
      .then((data) => {
        if (!!data.data.access && data.status === 'ok') {
          if (isEnableCookie()) {
            setCookie(COOKIE_TOKEN_NAME, data.data.access, { path: '/', expires: COOKIE_TOKEN_EXPIRES });
            dispatch({
              type: constAuth.AUTH_SUCCESS,
            });
            redirectToBack();
            return 1;
          }
          throw Object({ error: 'Cookie' });
        } else {
          throw data.data;
        }
      })
      .catch((error) => {
        dispatch({
          type: constAuth.AUTH_ERROR,
          payload: error,
        });
      });
  };
}

// авторизация Вконтакте
export function authVK(code, redirectToBack) {
  return auth('auth/vk', code, redirectToBack);
}

// авторизация Инстаграм
export function authIG(code, redirectToBack) {
  return auth('auth/ig', code, redirectToBack);
}

// Создание ошибки для вывода в componentDidUpdate,
// чтобы работала локализация
export function createError(typeError = 'default') {
  return {
    type: AUTH_ERROR,
    payload: typeError,
  };
}

// Очищение ошибок
export function clearError() {
  return {
    type: constAuth.AUTH_ERROR_CLEAR,
  };
}
