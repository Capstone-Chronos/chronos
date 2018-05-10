import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {Toaster, Intent} from '@blueprintjs/core';
import {app, googleProvider} from '../base';
import {Form, Button} from 'semantic-ui-react';
import {connect} from 'react-redux';
import store, {setUser} from '../store/index';

const loginStyles = {
  width: '90%',
  maxWidth: '315px',
  margin: '20px auto',
  border: '1px solid #ddd',
  borderRadius: '5px',
  padding: '10px',
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.authWithGoogle = this.authWithGoogle.bind(this);
    this.authWithEmailPassword = this.authWithEmailPassword.bind(this);
    this.state = {
      redirect: false,
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
            message: 'Unable to sign in with Google',
          });
        } else {
          this.props.setCurrentUser(user);
          this.setState({redirect: true});
        }
      });
  }

  authWithEmailPassword(event) {
    event.preventDefault();

    const email = this.emailInput.value;
    const password = this.passwordInput.value;

    app
      .auth()
      .fetchSignInMethodsForEmail(email)
      .then(providers => {
        console.log(providers);
        if (providers.length === 0) {
          // create user
          console.log('No user!')
          throw Error('User not found');
          //return app.auth().createUserWithEmailAndPassword(email, password)
        } else if (providers.indexOf('password') === -1) {
          // they used google
          this.loginForm.reset();
          this.toaster.show({
            intent: Intent.WARNING,
            message: 'Incorrect email or password.',
          });
        } else {
          // sign user in
          return app.auth().signInWithEmailAndPassword(email, password);
        }
      })
      .then(user => user.providerData[0])
      .then(user => {
        if (user && user.email) {
          this.loginForm.reset();
          store.dispatch(setUser(user.uid));
          this.setState({redirect: true});
        }
      })
      .catch(error => {
        console.log(this.toaster);
        this.toaster.show({intent: Intent.DANGER, message: error.message});
      });
  }

  render() {
    const {from} = this.props.location.state || {
      from: {pathname: '/timelines'},
    };

    if (this.state.redirect === true) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <Toaster
          ref={element => {
            this.toaster = element;
          }}
        />
        <button
          onClick={() => {
            this.authWithGoogle();
          }}>
          Log In with Google
        </button>
        <hr />
        <form
          onSubmit={event => {
            this.authWithEmailPassword(event);
          }}
          ref={form => {
            this.loginForm = form;
          }}>
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Login);
