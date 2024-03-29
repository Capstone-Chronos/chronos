import React, { Component } from 'react';
import { Redirect, withRouter, Link } from 'react-router-dom';
import { app, googleProvider } from '../../base';
import { connect } from 'react-redux';
import store, { setUser } from '../../store';
import ErrorMessage from './ErrorMessage';
// import history from '../../routes/history';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      errorMessage: ''
    };
    this.authWithGoogle = this.authWithGoogle.bind(this);
    this.authWithEmailPassword = this.authWithEmailPassword.bind(this);
  }

  authWithGoogle() {
    app
      .auth()
      .signInWithPopup(googleProvider)
      .then(userObj => userObj.user)
      .then(userObj => {
        const { email, uid } = userObj;
        return {
          email,
          uid
        };
      })
      .then(user => {
        this.loginForm.reset();
        store.dispatch(setUser(user.email, user.uid));
        this.props.history.push('/charts');
        // this.setState({ redirect: true });
      })
      .catch(error => {
        this.setState({ errorMessage: error.message });
      });
  }

  authWithEmailPassword(event) {
    event.preventDefault();
    const email = event.target.emailInput.value;
    const password = event.target.passwordInput.value;

    return app
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        if (user && user.email) {
          this.loginForm.reset();
          store.dispatch(setUser(user.uid));
          this.props.history.push('/charts');
        }
      })
      .catch(error => {
        this.setState({ errorMessage: error.message });
      });
  }

  render() {
    //   const { from } = this.props.location.state || {
    //     from: { pathname: '/charts' }
    //   };

    //   if (this.state.redirect === true) {
    //     return <Redirect to={from} />;
    //   }

    return (
      <div
        className="ui container middle aligned center aligned grid"
        id="login-box"
      >
        <div className="ui middle aligned center aligned grid">
          <div className="column">
            <h2 className="ui teal image header">
              <img src="assets/images/logo.png" className="image" alt="" />
              <div className="content">Log-in to your account</div>
            </h2>
            <form
              className="ui large form"
              onSubmit={event => {
                this.authWithEmailPassword(event);
              }}
              ref={form => {
                this.loginForm = form;
              }}
            >
              <div className="ui stacked segment">
                <div className="field">
                  <div className="ui left icon input">
                    <i className="user icon" />
                    <input
                      type="text"
                      name="emailInput"
                      placeholder="E-mail address"
                      autoComplete="off"
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="ui left icon input">
                    <i className="lock icon" />
                    <input
                      type="password"
                      name="passwordInput"
                      placeholder="Password"
                      autoComplete="off"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="ui fluid large teal submit button"
                >
                  Login
                </button>
                <div
                  className="ui fluid large submit button"
                  id="google-login"
                  onClick={() => {
                    this.authWithGoogle();
                  }}
                >
                  Log In with Google
                </div>
              </div>

              <div className="ui error message" />
            </form>
            <div className="ui message">
              New to us? <Link to="/signup">Sign Up</Link>
            </div>
            <div>
              {this.state.errorMessage && (
                <ErrorMessage message={this.state.errorMessage} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default withRouter(connect(mapStateToProps)(Login));
