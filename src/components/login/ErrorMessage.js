import React from 'react';
import { Message } from 'semantic-ui-react';

const ErrorMessage = ({ message }) => (
  <Message negative>
    <Message.Header>Error</Message.Header>
    <p>{message}</p>
  </Message>
);

export default ErrorMessage;
