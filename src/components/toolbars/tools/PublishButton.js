import React from 'react';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { publishChart } from '../../../database/sankeyChart'

class PublishButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      message: ''
    };
    this.publishChart = this.publishChart.bind(this);
  }

  publishChart() {
    if (!this.props.title) {
      this.setState({
        isActive: true,
        message: 'Published charts require a title'
      });
    } else {
      console.log(this.props)
      publishChart(this.props.chartId)
    }
  }

  render() {
    return ( 
      this.props.chartId && (
        <div>
          <button className="ui button" onClick={this.publishChart}>
            Publish
          </button>
          <div className={`ui page dimmer ${this.state.isActive && 'active'}`}>
            <div className={`ui modal ${this.state.isActive && 'active'}`}>
              <div className="content">
                <p>{this.state.message}</p>
              </div>
              <div className="actions">
                <div
                  className="ui green ok inverted button"
                  onClick={() =>
                    this.setState({ isActive: false, message: '' })
                  }
                >
                  <i className="checkmark icon" />
                  OK
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    );
  }
}

function mapStateToProps(state) {
  return {
    // chartId: state.selectedChart.id,
    // title: state.selectedChart.title,
    isLoggedIn: state.user.isLoggedIn
  };
}

export default connect(mapStateToProps)(PublishButton);
