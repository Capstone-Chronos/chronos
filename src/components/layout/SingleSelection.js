import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Image } from 'semantic-ui-react';

const SingleSelection = props => (
  <Card className="single-card" as={Link} to={props.url}>
    <Image src="https://www.fillmurray.com/300/200" centered size="medium" />
    <Card.Content>
    {console.log('single selection', props)}

      <Card.Header>{props.name}</Card.Header>
      <Card.Meta>Type: {props.type}</Card.Meta>
      <Card.Description>The description goes here.</Card.Description>
    </Card.Content>
  </Card>
);

export default SingleSelection;
