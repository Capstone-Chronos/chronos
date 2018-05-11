import React from 'react';
import { Switch, Route } from 'react-router-dom';

import BarChartTools from './BarChartTools';

const Toolbar = () => (
  <Switch>
    <Route path="/edit/barchart" component={BarChartTools} />
  </Switch>
)

export default Toolbar;
