import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import 'app.sass';

import 'jquery';
import 'bootstrap-sass/assets/javascripts/bootstrap.min';

import '../index.pug';

import BMICalculator from './BMICalculator';
import store from './Store';

ReactDOM.render(
  <Provider store={store}>
    <BMICalculator/>
  </Provider>,
  document.getElementById('app'),
);

if (module.hot) {
  // hack, 讓 html 能夠自動 reload
  // eslint-disable-next-line import/no-unresolved,global-require,import/no-webpack-loader-syntax
  require('!!raw-loader!../index.pug');
  // css hot reload in dev mode
  window.addEventListener('message', (event) => {
    if (typeof event.data === 'string' && event.data.indexOf('webpackHotUpdate') === 0) {
      document.querySelectorAll('link[href][rel=stylesheet]').forEach((link) => {
        if (/localhost/g.test(link.href)) {
          link.href = link.href.replace(/(\?\d+)?$/, `?${Date.now()}`);
        }
      });
    }
  });
}
