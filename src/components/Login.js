import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { app, googleProvider } from '../base';
import { connect } from 'react-redux';
import store, { setUser } from '../store/index';
import ErrorMessage from './ErrorMessage';

class Login extends Component {
  constructor(props) {
    super(props);
    this.authWithGoogle = this.authWithGoogle.bind(this);
    this.authWithEmailPassword = this.authWithEmailPassword.bind(this);
    this.state = {
      redirect: false,
      errorMessage: ''
    };
  }

  authWithGoogle() {
    app
      .auth()
      .signInWithPopup(googleProvider)
      .then((user, error) => {
        if (error) {
          throw Error('Unable to sign in with Google');
        } else {
          this.loginForm.reset();
          store.dispatch(setUser(user.uid));
          this.setState({ redirect: true });
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({ errorMessage: error.message });
      });
  }

  authWithEmailPassword(event) {
    event.preventDefault();

    const email = this.emailInput.value;
    const password = this.passwordInput.value;

    return (
      app
        .auth()
        .signInWithEmailAndPassword(email, password)
        //.then(user => user.providerData[0])
        .then(user => {
          //console.log(user);
          if (user && user.email) {
            this.loginForm.reset();
            store.dispatch(setUser(user.uid));
            this.setState({ redirect: true });
          }
        })
        .catch(error => {
          console.log(error);
          this.setState({ errorMessage: error.message });
        })
    );
  }

  render() {
    const { from } = this.props.location.state || {
      from: { pathname: '/timelines' }
    };

    if (this.state.redirect === true) {
      return <Redirect to={from} />;
    }

    return (
      <div id="loginContainer">
        <button
          id="customBtn"
          onClick={() => {
            this.authWithGoogle();
          }}
        >
          Log In with Google
        </button>
        <hr />
        <form
          onSubmit={event => {
            this.authWithEmailPassword(event);
          }}
          ref={form => {
            this.loginForm = form;
          }}
        >
          <div>
            <label>
              <input
                className="login-input"
                name="email"
                type="email"
                ref={input => {
                  this.emailInput = input;
                }}
                placeholder="Email"
              />
            </label>
          </div>
          <div>
            <label>
              <input
                className="login-input"
                name="password"
                type="password"
                ref={input => {
                  this.passwordInput = input;
                }}
                placeholder="Password"
              />
            </label>
          </div>
          <input type="submit" value="Log In" className="login-button" />
        </form>
        {this.state.errorMessage && (
          <ErrorMessage message={this.state.errorMessage} />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Login);
