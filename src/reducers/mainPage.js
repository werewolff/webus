import * as constMainPage from '../constants/mainPage';

const initialState = {
  dataPost: {},
  getDataPostError: '',
  loading: false,
};

export default function mainPage(state = initialState, action) {
  switch (action.type) {
    case constMainPage.GET_DATA_POST_REQUEST:
      return {
        ...state, getDataPostError: '', loading: true,
      };
    case constMainPage.GET_DATA_POST_SUCCESS:
      return {
        ...state, dataPost: action.payload, getDataPostError: '', loading: false,
      };
    case constMainPage.GET_DATA_POST_ERROR:
      return {
        ...state, getDataPostError: action.payload, loading: false,
      };
    case constMainPage.CLEAR_DATA_POST:
      return {
        ...state, dataPost: null, getDataPostError: '', loading: false,
      };
    default:
      return state;
  }
}
