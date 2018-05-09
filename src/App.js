import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import history from './routes/history';
import store from './store';
import { Navbar, Footer } from './components';
import Routes from './routes/routes';

const App = () => {
  return (
    <div className="site">
      <Navbar />
      <div className="site-content">
        <Routes />
      </div>
      <Footer />
    </div>
  );
};

export default App;
