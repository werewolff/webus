import { combineReducers } from 'redux';
import { localizeReducer } from 'react-localize-redux';
import mainPage from './mainPage';
import auth from './auth';
import user from './user';
import notify from './notify';

export default combineReducers({
  localize: localizeReducer,
  mainPage,
  auth,
  user,
  notify,
});
