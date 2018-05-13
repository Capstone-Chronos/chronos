import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { SankeyTools } from '../components';
import { BarChartTools } from '../components/toolbars';

const Toolbar = () => (
  <Switch>
    <Route path="/edit/barchart" component={BarChartTools} />
    <Route exact path="/edit/barchart/:id" component={BarChartTools} />
    <Route exact path="/edit/barchart" component={BarChartTools} />

    <Route exact path="/edit/piechart/:id" component={BarChartTools} />
    <Route exact path="/edit/piechart" component={BarChartTools} />

    <Route exact path="/edit/sankey/:id" component={SankeyTools} />
    <Route exact path="/edit/sankey" component={SankeyTools} />
  </Switch>
);

export default Toolbar;