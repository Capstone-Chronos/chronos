import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SingleSelection from './SingleSelection';

class BarChartTools extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // this.props.fetchAllTimelines();
  }

  render() {
    return <SingleSelection />;
  }
}

export default BarChartTools;
