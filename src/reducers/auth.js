import * as constAuth from '../constants/auth';

const initialState = {
  authError: '',
  loading: false,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    // AUTH
    case constAuth.AUTH_REQUEST:
      return { ...state, authError: '', loading: true };
    case constAuth.AUTH_SUCCESS:
      return { ...state, authError: '', loading: false };
    case constAuth.AUTH_ERROR:
      return { ...state, authError: action.payload, loading: false };
    case constAuth.AUTH_ERROR_CLEAR:
      return { ...state, authError: '' };
    default:
      return state;
  }
}