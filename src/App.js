import React from 'react';
import { Navbar, Footer } from './components';
import Routes from './routes/routes';

const App = () => {
  return (
    <div className="site">
      <div>
        <Navbar />
      </div>
      <div className="site-content">
        <Routes />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default App;
