import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';

export default class Login extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <Form>
        <Form.Input label="Email" />
        <Form.Input label="Password" type="password" />

        <Button>Sign Up</Button>
      </Form>
    );
  }
}