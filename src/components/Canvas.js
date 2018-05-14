import React from 'react';
import { Route, Switch } from 'react-router-dom';
import BarChart from './BarChart';
import Choropleth from './choropleth';

const Canvas = () => (
  <Switch>
    <Route path="/edit/barchart" component={BarChart} />
    <Route path="/edit/choropleth" component={Choropleth} />
  </Switch>
);

export default Canvas;
