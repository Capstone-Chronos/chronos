import React from 'react';
import store, { addDataPoint, saveBarChartThunk } from '../../store';
import { Button } from 'semantic-ui-react';
import { BarChartJSONUtil } from './BarChartUtils/BarChartJSONUtil';
import { PublishButton } from '../index';
import { connect } from 'react-redux';

class BarChartTools extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addNodeVal: ''
    };
    this.addDataPoint = this.addDataPoint.bind(this);
    this.updateLocalNodeVal = this.updateLocalNodeVal.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  // Add Data Point functions

  addDataPoint(evt) {
    evt.preventDefault();
    store.dispatch(addDataPoint(this.state.addNodeVal));
    console.log('submitted');
    console.log(this.state);
  }

  updateLocalNodeVal(evt) {
    evt.preventDefault();
    this.setState({ addNodeVal: evt.target.value });
  }

  handleSave() {
    const { chartId, data } = this.props;
    this.props.save(chartId, data);
  }

  render() {
    return (
      <div className="bar-toolbar">
        <BarChartJSONUtil />
        <Button onClick={this.handleSave}>SAVE</Button>
        <PublishButton />
        <div className="updateForm">
          <form onSubmit={this.addDataPoint}>
            <input label="data" onChange={this.updateLocalNodeVal} />
            <Button type="submit" value="Submit">
              ADD
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isSaved: state.barChart.isSaved,
  data: state.barChart.data,
  chartId: state.barChart.chartId
});

const mapDispatchToProps = dispatch => ({
  save: (chartId, data) => dispatch(saveBarChartThunk(chartId, data))
});

export default connect(mapStateToProps, mapDispatchToProps)(BarChartTools);
