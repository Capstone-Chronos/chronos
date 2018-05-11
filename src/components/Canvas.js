import React from 'react';
import { Route, Switch } from 'react-router-dom';
import BarChart from './BarChart';

const Canvas = () => (
  <Switch>
    <Route exact path="/edit/barchart" component={BarChart} />
  </Switch>
);

export default Canvas;
