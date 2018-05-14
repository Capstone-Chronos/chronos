import React from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { Canvas } from '../../components';

class PresentationView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      states: [],
      currentStateIdx: 0
    };
  }
  render() {
    return (
      <Grid divided>
        <Grid.Column width={11}>
          <Canvas />
        </Grid.Column>
        <Grid.Column width={5}>
          <button className="ui labeled icon button">
            <i className="pause icon" />
            Previous
          </button>
          <button className="ui right labeled icon button">
            <i className="right arrow icon" />
            Next
          </button>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  chart: state.selectedChart
});

export default connect(mapStateToProps)(PresentationView);
