import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import ChartContainer from '../components/ChartContainer';
import {
  Main,
  AllTimelines2,
  SignUp,
  Login,
  BarChart,
  SankeyWrapper
} from '../components';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    console.log('Routes mounted!');
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/timelines" component={AllTimelines2} />
          {/* <Route exact path="/create" component={EditTimeline} /> */}
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route path="/edit" component={ChartContainer} />
          <Route exact path="/sankey" component={SankeyWrapper} />
          <Route
            exact
            path="/barchart"
            render={() => <BarChart data={[5, 10, 1, 3]} size={[500, 500]} />}
          />
        </Switch>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {};
};

const mapDispatch = dispatch => {
  return {};
};

export default withRouter(connect(mapState, mapDispatch)(Routes));

/**
 * PROP TYPES
 */
// Routes.propTypes = {
//   loadInitialData: PropTypes.func.isRequired,
// };
