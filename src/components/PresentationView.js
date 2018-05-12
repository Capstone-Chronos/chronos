import React from 'react';
import { connect } from 'react-redux';
import { PublishButton } from './index';

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
      <div className="presentation-container ui container">
        <div id="presentation-chart">
          <p>TESTSETSETESTESTETSTESTSTESTSETESTETS</p>
        </div>
        <div id="presentation-sidebar">PLACEHOLDER</div>
        {/*
        <button class="ui labeled icon button">
          <i class="pause icon" />
          Previous
        </button>
        <button class="ui right labeled icon button">
          <i class="right arrow icon" />
          Next
        </button>
        <i class="compress icon" /> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  chart: state.selectedChart
});

export default connect(mapStateToProps)(PresentationView);
