import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Image } from 'semantic-ui-react';
import { fetchChartById } from '../../database/charts';

const SingleSelection = ({ id, url, name, type, description, imgUrl }) => (
  <Card className="single-card" as={Link} to={url}>
    <Image src={imgUrl} centered width='250' height='160' />
    <Card.Content>
      <Card.Header>{name}</Card.Header>
      <Card.Meta>Type: {type}</Card.Meta>
      <Card.Description>{description}</Card.Description>
    </Card.Content>
  </Card>
);

export default SingleSelection;
