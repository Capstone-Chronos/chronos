import React, { Component } from 'react';
import { loadData, readFile } from './../toolbars/SankeyUtils/utils';
import {
  deleteChart,
  updateChart,
  fetchChartById,
  publishChart
} from '../../database/mapChart';
import {
  loadDefaultData,
  clearData,
  importData,
  saveMapChartThunk,
  updateTitle
} from '../../store';
import { connect } from 'react-redux';
import { Button, Input } from 'semantic-ui-react';
import FooterBar from './SankeyUtils/FooterBar';
import PublishButton from './tools/PublishButton';

class MapChartTools extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      height: this.props.height,
      width: this.props.width
    };
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitHeightWidth = this.submitHeightWidth.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

    toggleVisibility = () => this.setState({ visible: !this.state.visible });

    handleChange(evt) {
      this.setState({ [evt.target.name]: evt.target.value });
    }

    handleUpdate() {
      let { data, chartId } = this.props;
      updateChart(data, chartId);
    }

    handleSubmit() {
      let savedData = {
        name: this.props.title,
        data: this.state.data || this.props.data,
        userId: this.props.userId,
        width: this.state.width || this.props.width,
        height: this.state.height || this.props.height
      };
      this.props.saveChanges(this.props.data, this.props.title);
    }

    submitHeightWidth(evt) {
      evt.preventDefault();
      this.props.changeHeight(this.state.height);
      this.props.changeWidth(this.state.width);
    }

    render() {
      return (
        <div>

          <h4>Edit Chart Dimensions</h4><hr />
          <div className="form">
            <form onSubmit={this.submitHeightWidth}>
              <div className="tool-item">
                <Input
                  onChange={this.handleChange}
                  name="width"
                  label="Width"
                  defaultValue={this.props.width}
                />
              </div>
              <div className="tool-item">
                <Input
                  onChange={this.handleChange}
                  name="height"
                  label="Height"
                  defaultValue={this.props.height}
                />
              </div>
              <div className="tool-item">
                <Button
                  className="tool-button"
                  onClick={this.submitHeightWidth}
                >
                    Update chart size
                </Button>
              </div>
            </form>
            <h4>Save Changes</h4>
            <hr />
            <div className="tool-item">
              <Button className="tool-button" onClick={this.props.handleUpdate}>
                  Update Chart
              </Button>
            </div>
            <div className="tool-item">
              <Button className="tool-button" onClick={this.props.handleSubmit}>
                  Save Changes as New Chart
              </Button>
              <PublishButton title="fake title" publish={this.props.publishTheChart} chartId={this.props.chartId} />
            </div>
            <div className="tool-item">
              <FooterBar
                data={this.props.data}
                readFile={this.props.readFile}
                emptyDiagram={this.props.emptyDiagram}
              />
            </div>
            <div className="tool-item">
              <Button className="tool-button" color="red" onClick={this.props.delete}>
                  Delete Chart
              </Button>
            </div>
          </div>
        </div>

      );
    }
}

const mapStateToProps = state => ({
  isSaved: state.mapChart.isSaved,
  data: state.mapChart.data,
  userId: state.user.id,
  chartId: state.mapChart.chartId,
  title: state.mapChart.title
});

const mapDispatchToProps = function(dispatch) {
  return {
    fetchDefaultData: () => {
      const action = loadDefaultData();
      dispatch(action);
    },
    saveChanges: (data, title) => {
      const action = saveMapChartThunk(data, title);
      dispatch(action);
    },
    delete: (chartId, userId) => {
      const action = deleteChart(chartId, userId);
      dispatch(action);
    },
    clearChart: () => {
      const action = clearData();
      dispatch(action);
    },
    updateTheTitle: title => {
      const action = updateTitle(title);
      dispatch(action);
    },
    uploadData: data => {
      const action = importData(data);
      dispatch(action);
    },
    publishTheChart: chartId => {
      const action = publishChart(chartId);
      dispatch(action);
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapChartTools);
