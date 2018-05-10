import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import BarChartCanvas from './BarChartCanvas';
import BarChartTools from './BarChartTools';
import Toolbar from './Toolbar';

class ChartContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    let tools = [
      {
        clickHandler: function() {
          alert('It works!');
        },
        name: 'Call Alert'
      }
    ];
    return (
      <div className="chartContainer">
        <div>
          <BarChartCanvas />
        </div>
        <div>
          <BarChartTools />
        </div>
        {/* <Toolbar tools={tools} /> */}
      </div>
    );
  }
}

export default ChartContainer;
