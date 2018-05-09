import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';

export default class SignUp extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <Form>
        <Form.Input label="Email" />
        <Form.Input label="Password" type="password" />
        <Form.Input label="Confirm password" type="password" />

        <Button>Sign Up</Button>
      </Form>
    );
  }
}
