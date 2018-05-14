import React from 'react';
import { Navbar, Footer } from './components';
import Routes from './routes/routes';
import { getUserInfo } from './database/auth';
import store from './store';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }

  componentDidMount() {
    this.setState({ isLoggedIn: store.getState().user.isLoggedIn });
    if (!this.state.isLoggedIn) getUserInfo();
  }

  render() {
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
  }
}

export default App;
