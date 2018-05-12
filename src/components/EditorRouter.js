import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Editor from './Editor';
import { BarChart } from './charts';
import { BarTools } from './toolbars';
import { Choropleth } from './index';

const charts = [
  {id: 1, path: '/edit/barchart', canvas: BarChart, toolbar: BarTools},
];

const EditorRouter = () => (
  <Switch>
    {charts.map(chart => 
      <Route key={chart.id} path={chart.path} render={() => <Editor toolbar={chart.toolbar} canvas={chart.canvas} />} />
    )}
    <Redirect to="/" />
  </Switch>
);

export default EditorRouter;
