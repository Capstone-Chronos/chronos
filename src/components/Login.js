import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Position, Toaster, Intent } from '@blueprintjs/core';
import { app, googleProvider } from '../base';
import { Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import store, { setUser } from '../store/index';
import ErrorMessage from './ErrorMessage';

const loginStyles = {
  width: '90%',
  maxWidth: '315px',
  margin: '20px auto',
  border: '1px solid #ddd',
  borderRadius: '5px',
  padding: '10px'
};

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
          this.toaster.show({
            intent: Intent.DANGER,
            message: 'Unable to sign in with Google'
          });
        } else {
          this.props.setCurrentUser(user);
          this.setState({ redirect: true });
        }
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
            console.log(user)
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
    // app
    //   .auth()
    //   .fetchSignInMethodsForEmail(email)
    //   .then(providers => {
    //     console.log(providers);
    //     if (providers.length === 0) {
    //       // create user
    //       console.log('No user!');
    //       this.loginForm.reset();
    //       throw Error('User not found');
    //       //return app.auth().createUserWithEmailAndPassword(email, password)
    //     } else if (providers.indexOf('password') === -1) {
    //       // they used google
    //       this.loginForm.reset();
    //       throw Error('Incorrect Password');
    //     } else {
    //       // sign user in
    //       return app.auth().signInWithEmailAndPassword(email, password);
    //     }
    //   })
    //   .then(user => user.providerData[0])
    //   .then(user => {
    //     if (user && user.email) {
    //       this.loginForm.reset();
    //       store.dispatch(setUser(user.uid));
    //       this.setState({ redirect: true });
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     this.toaster.show({
    //       intent: Intent.WARNING,
    //       message: 'Incorrect email or password.'
    //     });
    //   });
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
          <label>
            Email
            <input
              name="email"
              type="email"
              ref={input => {
                this.emailInput = input;
              }}
              placeholder="Email"
            />
          </label>
          <label>
            Password
            <input
              name="password"
              type="password"
              ref={input => {
                this.passwordInput = input;
              }}
              placeholder="Password"
            />
          </label>
          <input type="submit" value="Log In" />
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
