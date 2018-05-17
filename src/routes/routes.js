import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import ChartRoutes from './ChartRoutes';
import Sankey, {
  Main,
  AllProjects,
  SignUp,
  Login,
  PresentationView,
  Editor,
  SankeyWrapper,
  TimelineWrapper,
  Choropleth
} from '../components';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    console.log('Routes mounted!');
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        <Switch>
          {isLoggedIn && (
            <Switch>
              <Route exact path="/" component={Main} />
              <Route exact path="/charts" component={AllProjects} />
              <Route exact path="/projects" component={AllProjects} />
              <ChartRoutes />

              <Route path="/edit" component={Editor} />
              <Route path="/show" component={PresentationView} />
              <Route path="/view" component={PresentationView} />

              <Route path="/edit" component={Editor} />
              <Route path="/show" component={PresentationView} />
              <Route path="/view" component={PresentationView} />

              <Route path="/sankey" component={SankeyWrapper} />
              <Route path="/timeline" component={TimelineWrapper} />
              <Route path="/choropleth" component={Choropleth} />
            </Switch>
          )}
          <Route exact path="/" component={Main} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route to="/signup" component={SignUp} />
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
    isLoggedIn: !!state.user.isLoggedIn
  };
};

const mapDispatch = dispatch => {
  return {};
};

export default withRouter(connect(mapState, mapDispatch)(Routes));

/**
 * PROP TYPES
 */
