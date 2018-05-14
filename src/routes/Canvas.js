import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { BarChart, SankeyWrapper, PieChart } from '../components';

const Canvas = () => (
  <Switch>
    <Route path="/:type/barchart" component={BarChart} />
    <Route exact path="/:type/barchart/:id" component={BarChart} />
    <Route exact path="/:type/barchart" component={BarChart} />

    <Route exact path="/:type/sankey/:id" component={SankeyWrapper} />
    <Route exact path="/:type/sankey" component={SankeyWrapper} />

    <Route exact path="/:type/piechart/:id" component={PieChart} />
    <Route exact path="/:type/piechart" component={PieChart} />
  </Switch>
);

export default Canvas;
