import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { BarTools } from './toolbars';

const Toolbar = () => (
  <Switch>
    <Route path="/edit/barchart" component={BarTools} />
  </Switch>
)

export default Toolbar;
