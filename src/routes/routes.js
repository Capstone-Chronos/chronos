import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import {
  Main,
  AllProjects,
  SignUp,
  Login,
  PresentationView,
  Editor,
  SankeyWrapper,
  TimeChartWrapper
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
          <Route exact path="/charts" component={AllProjects} />
          <Route exact path="/projects" component={AllProjects} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/edit/sankey/:id" component={SankeyWrapper} />
          <Route exact path="/edit/sankey" component={SankeyWrapper} />
          <Route exact path="/edit/timechart" component={TimeChartWrapper} />
          <Route path="/edit" component={Editor} />
          <Route path="/show" component={PresentationView} />
          <Route path="/view" component={PresentationView} />
          <Route path="/sankey" component={SankeyWrapper} />
          <Redirect to="/" />
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
