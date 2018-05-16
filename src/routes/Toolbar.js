import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { SankeyTools, Choropleth } from '../components';
import { BarChartTools } from '../components/toolbars';
import { MapChartTools } from '../components/toolbars';
 
const Toolbar = () => (
  <Switch>
    <Route path="/:type/barchart" component={BarChartTools} />
    <Route exact path="/:type/barchart/:id" component={BarChartTools} />
    <Route exact path="/:type/barchart" component={BarChartTools} />
  </Switch>
);

export default Toolbar;
