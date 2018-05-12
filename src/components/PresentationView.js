import React from 'react';
import { connect } from 'react-redux';
import { PublishButton, SankeyWrapper, BarChart } from './index';
import { Grid, Column } from 'semantic-ui-react';

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
          <BarChart />
        </Grid.Column>
        <Grid.Column width={5}>
          <button class="ui labeled icon button">
            <i class="pause icon" />
            Previous
          </button>
          <button class="ui right labeled icon button">
            <i class="right arrow icon" />
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
