import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import BarChartCanvas from './BarChartCanvas';
import BarChartTools from './BarChartTools';

export default class ChartRouter extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // this.props.fetchAllTimelines();
  }

  render() {
    return (
      <Switch>
        <Route
          exact
          path="/edit/barchart"
          render={() => (
            <ChartContainer chart={BarChartCanvas} tools={BarChartTools} />
          )}
        />
      </Switch>
    );
  }
}

/**
 * CONTAINER
 */
// const mapState = state => {
//   return {

//   };
// };

// const mapDispatch = function(dispatch) {
//   return {

//   };
// };

// export default connect(mapState, mapDispatch)(ChartContainer);
