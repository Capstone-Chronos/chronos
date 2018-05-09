import React from 'react';
import { Card, Image, Button, Label } from 'semantic-ui-react';

const SingleSelection = props => (
  <Card link>
    <Image 
      src="https://www.fillmurray.com/300/200"
      centered
      size="small"
    />
    <Card.Content>
      <Card.Header>{props.name}</Card.Header>
      <Card.Meta>Meta information goes here</Card.Meta>
      <Card.Description>
        The description goes here.
      </Card.Description>
    </Card.Content>
  </Card>
);

export default SingleSelection;
