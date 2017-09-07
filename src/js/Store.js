import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import Perf from 'react-addons-perf';

import { reducer as bmiReducer } from './bmi/index';
import StorageUtil from './utils/StorageUtil';


const win = window;

win.Perf = Perf;

const reducer = combineReducers({
  bmi: bmiReducer,
});

const middlewares = [];
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(require('redux-immutable-state-invariant').default());
}

const storeEnhancers = compose(
  applyMiddleware(...middlewares),
  (win && win.devToolsExtension) ? win.devToolsExtension() : f => f,
);

const preloadedState = {
  bmi: StorageUtil.getLogs(),
};

export default createStore(reducer, preloadedState, storeEnhancers);
