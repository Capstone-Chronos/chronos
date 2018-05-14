import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
//import Editor from './Editor';
import BarChart from './BarChart';
import BarChartTools from './BarChartTools';
import Choropleth from './choropleth';

const charts = [
  {id: 2, path: '/edit/barchart', canvas: BarChart, toolbar: BarChartTools},
  {id: 2, path: '/edit/something', canvas: BarChart, toolbar: BarChartTools},
];

const Editor = ({toolbar, canvas}) => {
  let [Toolbar, Canvas] = [toolbar, canvas];

  return (
    <div className="ui container">
      <div className="ui container">
        <Toolbar />
      </div>
      <div className="ui container">
        <Canvas />
      </div>
    </div>
  );
};
const EditorRouter = () => (
  Editor(charts[0])
);

export default EditorRouter;
