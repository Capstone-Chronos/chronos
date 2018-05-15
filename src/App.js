import React from 'react';
import { Navbar, Footer } from './components';
import Routes from './routes/routes';
import { getUserInfo } from './database/auth';
import store from './store';
import firebase from 'firebase';
import { withRouter } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }

  async componentDidMount() {
    let user = await firebase.auth().currentUser;
    console.log('The location is', this.props.history);
    if (!this.state.isLoggedIn) getUserInfo(this.props.location.pathname);
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

export default withRouter(App);
