import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { DEBUG } from '../Settings';

export default function configureStore(initialState) {
  const middlewares = [thunk];
  if (DEBUG) {
    // eslint-disable-next-line global-require
    const { logger } = require('redux-logger');
    middlewares.push(logger);
  }

  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares),
  );
}
