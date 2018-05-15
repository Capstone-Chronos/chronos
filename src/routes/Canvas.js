import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  BarChart,
  SankeyWrapper,
  PieChart,
  Choropleth,
  Timeline
} from '../components';

const Canvas = () => (
  <Switch>
    <Route path="/:type/barchart" component={BarChart} />
    <Route exact path="/:type/barchart/:id" component={BarChart} />
    <Route exact path="/:type/barchart" component={BarChart} />

    <Route exact path="/:type/sankey/:id" component={SankeyWrapper} />
    <Route exact path="/:type/sankey" component={SankeyWrapper} />

    <Route exact path="/:type/piechart/:id" component={PieChart} />
    <Route exact path="/:type/piechart" component={PieChart} />

    <Route exact path="/:type/timeline/:id" component={Timeline} />
    <Route exact path="/:type/timeline" component={Timeline} />

    <Route exact path="/:type/map/:id" component={Choropleth} />
    <Route exact path="/:type/map" component={Choropleth} />
  </Switch>
);

export default Canvas;
