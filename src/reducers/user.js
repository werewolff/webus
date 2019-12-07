import * as constUser from '../constants/user';

const initialState = {
  user: {},
  getUserError: '',
  loading: false,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    // GET USER DATA
    case constUser.USER_GET_REQUEST:
      return { ...state, getUserError: '', loading: true };
    case constUser.USER_GET_SUCCESS:
      return {
        ...state, user: action.payload, getUserError: '', loading: false,
      };
    case constUser.USER_GET_ERROR:
      return {
        ...state, user: {}, getUserError: action.payload, loading: false,
      };
    case constUser.USER_LOGOUT:
      return state;
    case constUser.USER_ERROR_CLEAR:
      return { ...state, getUserError: '' };
    default:
      return state;
  }
}
