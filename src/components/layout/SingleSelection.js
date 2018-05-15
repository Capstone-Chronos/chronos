import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Image } from 'semantic-ui-react';
import { fetchChartById } from '../../database/sankeyChart';

const SingleSelection = ({ id, url, name, type, description }) => (
  <Card className="single-card" as={Link} to={url}>
    <Image src="https://www.fillmurray.com/300/200" centered size="medium" />
    <Card.Content>
      {console.log('single selection', id)}

      <Card.Header>{name}</Card.Header>
      <Card.Meta>Type: {type}</Card.Meta>
      <Card.Description>{description}</Card.Description>
    </Card.Content>
  </Card>
);

export default SingleSelection;
