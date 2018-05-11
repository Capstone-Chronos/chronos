import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Editor from './Editor';

const charts = [
  {route: '/edit', canvas: BarChart, toolbar: BarToolbar}
];

const EditorRouter = () => (
  <Switch>
    {charts.map((chart, index) => (
      <Route
        key={index}
        path={chart.route}
        render={() => <Editor toolbar={chart.toolbar} canvas={chart.canvas} />}
      />
    ))}
    <Redirect to="/" />
  </Switch>
);

export default EditorRouter;
