import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Toaster, Intent } from '@blueprintjs/core'
import { app, googleProvider } from '../base'
import { Form, Button } from 'semantic-ui-react';

// export default class Login extends Component {
//   constructor (props) {
//     super(props);
//   }

//   render() {
//     return (
//       <Form>
//         <Form.Input label="Email" />
//         <Form.Input label="Password" type="password" />

//         <Button>Login</Button>
//         <hr />
//         <Button onClick={() => {this.authWithGoogle()}}>Login with Google</Button>
//       </Form>
//     );
//   }
// }

const loginStyles = {
  width: "90%",
  maxWidth: "315px",
  margin: "20px auto",
  border: "1px solid #ddd",
  borderRadius: "5px",
  padding: "10px"
}

class Login extends Component {
  constructor(props) {
    super(props)
    this.authWithGoogle = this.authWithGoogle.bind(this)
    this.authWithEmailPassword = this.authWithEmailPassword.bind(this)
    this.state = {
      redirect: false
    }
  }

  authWithGoogle() {
    app.auth().signInWithPopup(googleProvider)
      .then((user, error) => {
        if (error) {
          this.toaster.show({ intent: Intent.DANGER, message: "Unable to sign in with Google" })
        } else {
          this.props.setCurrentUser(user)
          this.setState({ redirect: true })
        }
      })
  }

  authWithEmailPassword(event) {
    event.preventDefault()

    const email = this.emailInput.value
    const password = this.passwordInput.value

    app.auth().fetchProvidersForEmail(email)
      .then((providers) => {
        if (providers.length === 0) {
          // create user
          return app.auth().createUserWithEmailAndPassword(email, password)
        } else if (providers.indexOf("password") === -1) {
          // they used google
          this.loginForm.reset()
          this.toaster.show({ intent: Intent.WARNING, message: "Try alternative login." })
        } else {
          // sign user in
          return app.auth().signInWithEmailAndPassword(email, password)
        }
      })
      .then((user) => {
        if (user && user.email) {
          this.loginForm.reset()
          this.props.setCurrentUser(user)
          this.setState({redirect: true})
        }
      })
      .catch((error) => {
        this.toaster.show({ intent: Intent.DANGER, message: error.message })
      })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/home' } }


    if (this.state.redirect === true) {
      return <Redirect to={from} />
    }

    return (
      <div>
        <Toaster ref={(element) => { this.toaster = element }} />
        <button onClick={() => { this.authWithGoogle() }}>Log In with Google</button>
        <hr />
        <form onSubmit={(event) => { this.authWithEmailPassword(event) }} ref={(form) => { this.loginForm = form }}>
          <div>
            <h5>Note</h5>
            If you don't have an account already, this form will create your account.
          </div>
          <label>
            Email
            <input name="email" type="email" ref={(input) => { this.emailInput = input }} placeholder="Email"></input>
          </label>
          <label>
            Password
            <input name="password" type="password" ref={(input) => { this.passwordInput = input }} placeholder="Password"></input>
          </label>
          <input type="submit" value="Log In"></input>
        </form>
      </div>
    )
  }
}
export default Login;