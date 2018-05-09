import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import BarChartCanvas from './BarChartCanvas';
import BarChartTools from './BarChartTools';

class ChartContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <BarChartCanvas />
        <BarChartTools />
      </div>
    );
  }
}

export default ChartContainer;
