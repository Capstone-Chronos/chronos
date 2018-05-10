import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BarChart from './BarChart';

class BarChartCanvas extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // this.props.fetchAllTimelines();
  }

  render() {
    return <BarChart size={[500, 500]} />;
  }
}

export default BarChartCanvas;