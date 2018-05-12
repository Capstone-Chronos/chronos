import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import EditorRouter from '../components/EditorRouter';
import Editor from '../components/Editor2';
import {
  Main,
  AllTimelines,
  SignUp,
  Login,
  SankeyWrapper
} from '../components';
import PresentationView from '../components/PresentationView';

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
          <Route exact path="/timelines" component={AllTimelines} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route path="/edit" component={EditorRouter} />
          <Route exact path="/sankey" component={SankeyWrapper} />
          <Route path="/show/:id" component={PresentationView} />
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
