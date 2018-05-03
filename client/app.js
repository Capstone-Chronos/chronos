import React from 'react';
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'

import history from '.routes/history'
import store from './store'
import { Navbar, Footer } from './components';
import Routes from '.routes/routes';

const App = () => {
  return (
    <div >
      <Provider store={store}>
        <Router history={history}>
          <Navbar />
          <Routes />
          <Footer />
        </Router>
      </Provider>
    </div>
  );
};

export default App;


