import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Data} from './reducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      data: Data,
    }),
    applyMiddleware(thunk, logger),
  );

  return store;
};
