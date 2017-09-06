import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import Perf from 'react-addons-perf';

import { reducer as formReducer } from './form';
import StorageUtil from './utils/StorageUtil';


const win = window;

win.Perf = Perf;

const reducer = combineReducers({
  form: formReducer,
});

const middlewares = [];
if (process.env.NODE_ENV !== 'production') {
// eslint-disable-next-line global-require
  middlewares.push(require('redux-immutable-state-invariant').default());
}

const storeEnhancers = compose(
  applyMiddleware(...middlewares),
  (win && win.devToolsExtension) ? win.devToolsExtension() : f => f,
);

const preloadedState = StorageUtil.getLogs();

export default createStore(reducer, preloadedState, storeEnhancers);
