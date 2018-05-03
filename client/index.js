import App from './app';
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import history from './routes/history';
import store from './store/index';


ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
);
