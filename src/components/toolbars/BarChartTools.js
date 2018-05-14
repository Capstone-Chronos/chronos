import React from 'react';
import store, {
  addDataPoint,
  saveBarChartThunk,
  updateBarChartThunk
} from '../../store';
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
    this.handleUpdate = this.handleUpdate.bind(this);
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
    let { chartId, data, title } = this.props;
    if (!title) title = 'TITLE_PLACEHOLDER';
    this.props.save(data, chartId, title);
  }

  handleUpdate() {
    console.log('updateBar');
    const { data, chartId } = this.props;
    this.props.update(data, chartId);
  }

  render() {
    const { isSaved, chartId } = this.props;
    return (
      <div className="bar-toolbar">
        <BarChartJSONUtil />
        <Button
          onClick={chartId ? this.handleUpdate : this.handleSave}
          disabled={isSaved}
        >
          {isSaved ? 'SAVED' : 'SAVE'}
        </Button>
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
  chartId: state.barChart.chartId,
  title: state.barChart.title
});

const mapDispatchToProps = dispatch => ({
  save: (data, title) => dispatch(saveBarChartThunk(data, title)),
  update: (data, chartId) => dispatch(updateBarChartThunk(data, chartId))
});

export default connect(mapStateToProps, mapDispatchToProps)(BarChartTools);
