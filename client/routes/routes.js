import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Navbar, Footer, Main, AllTimelines, EditTimeline, SignUp, Login, BarChart } from '../components';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    console.log('Routes mounted!')
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/timelines" component={AllTimelines} />
          <Route exact path="/create" component={EditTimeline} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/barchart" render={() => <BarChart data={[5,10,1,3]} size={[500,500]}/>} />
        </Switch>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
  };
};

const mapDispatch = dispatch => {
  return {
  };
};

export default withRouter(connect(mapState, mapDispatch)(Routes));

/**
 * PROP TYPES
 */
// Routes.propTypes = {
//   loadInitialData: PropTypes.func.isRequired,
// };
