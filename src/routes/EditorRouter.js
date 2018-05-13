import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { BarChart, BarChartTools, Editor } from '../components';

const charts = [
  { id: 1, path: '/edit/barchart', canvas: BarChart, toolbar: BarChartTools }
];

const EditorRouter = () => (
  <Switch>
    {charts.map(chart => (
      <Route
        key={chart.id}
        path={chart.path}
        render={() => <Editor toolbar={chart.toolbar} canvas={chart.canvas} />}
      />
    ))}
    <Redirect to="/" />
  </Switch>
);

export default EditorRouter;
