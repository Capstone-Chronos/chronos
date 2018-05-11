import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import BarChart from './BarChart';

const Canvas = () => (
  <Switch>
    <Route exact path="/edit/barchart" component={BarChart} />
  </Switch>
);

export default Canvas;
