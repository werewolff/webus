import * as constMainPage from '../constants/mainPage';
import ajax from '../utils/Ajax';

// Получение данных о посте
export function getDataPost(uri, token) {
  return (dispatch) => {
    dispatch({
      type: constMainPage.GET_DATA_POST_REQUEST,
    });
    ajax(`post_info?url=${uri}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(data => dispatch({
        type: constMainPage.GET_DATA_POST_SUCCESS,
        payload: data.data,
      }))
      .catch((error) => {
        dispatch({
          type: constMainPage.GET_DATA_POST_ERROR,
          payload: error,
        });
      });
  };
}

export function clearDataPost() {
  return {
    type: constMainPage.CLEAR_DATA_POST,
  };
}
