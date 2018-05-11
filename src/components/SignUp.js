import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { Position, Toaster, Intent } from '@blueprintjs/core';
import { app, googleProvider } from '../base';
import { connect } from 'react-redux';
import store, { setUser, signUpUser } from '../store/index';
import ErrorMessage from './ErrorMessage';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      errorMessage: ''
    };
    this.signUp = this.signUp.bind(this);
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

  signUp(event) {
    event.preventDefault();
    console.log('Reached event');
    console.log(this.submitForm);

    const email = event.target.email.value;
    const password = event.target.password.value;

    app
      .auth()
      .fetchSignInMethodsForEmail(email)
      .then(providers => {
        console.log(providers);
        if (providers.length === 0) {
          // create user
          return app.auth().createUserWithEmailAndPassword(email, password);
        } else {
          throw Error('Email already exists');
        }
      })
      .then(user => user.providerData[0])
      .then(user => {
        store.dispatch(signUpUser(user.uid));
        this.setState({ redirect: true });
      })
      .catch(error => {
        this.setState({
          errorMessage: error.message
        });
      });
  }

  render() {
    return (
      <div>
        <Form
          onSubmit={this.signUp}
          ref={form => {
            this.submitForm = form;
          }}
        >
          <Form.Input
            label="Email"
            name="email"
            type="email"
            ref={input => {
              this.emailInput = input;
            }}
          />
          <Form.Input
            label="Password"
            type="password"
            name="password"
            ref={input => {
              this.passwordInput = input;
            }}
          />
          <Form.Input label="Confirm password" type="password" />
          <Button type="submit">Sign Up</Button>
        </Form>
        {this.state.errorMessage && (
          <ErrorMessage message={this.state.errorMessage} />
        )}
      </div>
    );
  }
}
