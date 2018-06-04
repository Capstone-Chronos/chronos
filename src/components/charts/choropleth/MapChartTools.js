import React, { Component } from 'react';
import { readFile } from '../../toolbars/SankeyUtils/utils';
import MapFooterBar from './MapFooterBar';
import {
  deleteChart,
  saveExistingChart,
  fetchChartById,
  publishChart
} from '../../../database/charts';
import {
  loadDefaultData,
  clearMapData,
  saveMapChartThunk,
  updateTitle,
  importMapData
} from '../../../store/mapChart';
import { connect } from 'react-redux';
import { Button, Input } from 'semantic-ui-react';
import PublishButton from '../../toolbars/tools/PublishButton';
import { withRouter } from 'react-router-dom';
import request from 'superagent';
import { Title, ChartDimensions } from './Toolbar';

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
    this.setTitle = this.setTitle.bind(this);
    this.publishTheChart = this.publishTheChart.bind(this);
    // this.importMapDataFromFile = this.importMapDataFromFile.bind(this);

    this.emptyDiagram = this.emptyDiagram.bind(this);

    this.readFile = readFile.bind(this);
    this.delete = this.delete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  setTitle(evt) {
    evt.preventDefault();
    this.props.updateTheTitle(evt.target.title.value);
  }

  emptyDiagram() {
    this.props.clearChart();
    this.props.renderMap(this.toggleModal, this.props.data.stateColors);
  }

  publishTheChart() {
    let { chartId } = this.props;
    publishChart(chartId);
  }

  delete() {
    console.log(this.props);
    let chartId = this.props.chartId;
    let userId = this.props.userId;
    deleteChart(chartId, userId);
  }

  toggleVisibility() {
    this.setState(prevState => ({ visible: !prevState.visible }));
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleUpdate() {
    let { data, chartId } = this.props;
    saveExistingChart(data, chartId);
  }

  handleSubmit() {
    let savedData = {
      name: this.props.title,
      data: this.state.data || this.props.data,
      userId: this.props.userId,
      width: this.state.width || this.props.width,
      height: this.state.height || this.props.height
    };
    const data = {
      json: this.props.data,
      stateColors: this.props.data.stateColors
    };
    console.log(data);
    this.props.saveChanges(data, this.props.title);
  }

  submitHeightWidth(evt) {
    evt.preventDefault();
    this.props.changeHeight(this.state.height);
    this.props.changeWidth(this.state.width);
  }

  render() {
    return (
      <div className="map-chart-tools">
        <Title
          title={this.props.title}
          setTitle={this.setTitle}
          titleInput={this.state.title}
        />
        <ChartDimensions
          submitHeightWidth={this.submitHeightWidth}
          handleChange={this.handleChange}
          width={this.props.width}
          height={this.props.height}
        />
        <h4>Save Changes</h4>
        <hr />
        <div className="tool-item">
          <Button className="tool-button" onClick={this.handleUpdate}>
            Update Chart
          </Button>
        </div>
        <div className="tool-item">
            <Button className="tool-button" onClick={this.handleSubmit}>
              Save Changes as New Chart
            </Button>
            <PublishButton
              title="fake title"
              publish={this.props.publishTheChart}
              chartId={this.props.chartId}
            />
        </div>
        <div className="tool-item">
            <MapFooterBar
              data={this.props.data}
              // readFile={this.importMapDataFromFile}
              emptyDiagram={this.emptyDiagram}
            />
        </div>
        <div className="tool-item">
            <Button className="tool-button" color="red" onClick={this.delete}>
              Delete Chart
            </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    data: state.mapChart.data,
    userId: state.user.id,
    title: state.mapChart.title
  };
};

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
      const action = clearMapData();
      dispatch(action);
    },
    updateTheTitle: title => {
      const action = updateTitle(title);
      dispatch(action);
    },
    // uploadData: data => {
    //   const action = importData(data);
    //   dispatch(action);
    // },
    publishTheChart: chartId => {
      const action = publishChart(chartId);
      dispatch(action);
    },
    dispatchSetMapData: data => {
      const action = importMapData(data);
      dispatch(action);
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MapChartTools)
);
