import React, { Component } from 'react';
import { readFile } from '../../toolbars/SankeyUtils/utils';
import {
  deleteChart,
  saveExistingChart,
  fetchChartById,
  publishChart
} from '../../../database/charts';
import {
  loadDefaultData,
  saveMapChartThunk,
  importMapData
} from '../../../store/mapChart';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import request from 'superagent';
import { Title, ChartDimensions, FileOptions } from './Toolbar';

class MapChartTools extends Component {
  constructor(props) {
    super(props);
    this.publishTheChart = this.publishTheChart.bind(this);
    // this.importMapDataFromFile = this.importMapDataFromFile.bind(this);


    this.readFile = readFile.bind(this);
    this.delete = this.delete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  publishTheChart() {
    let { chartId } = this.props;
    publishChart(chartId);
  }

  delete() {
    let { chartId, userId } = this.props;
    deleteChart(chartId, userId);
  }

  handleUpdate() {
    let { data, chartId } = this.props;
    saveExistingChart(data, chartId);
  }

  handleSubmit() {
    let savedData = {
      name: this.props.title,
      data: this.props.data,
      userId: this.props.userId,
      width: this.props.width,
      height: this.props.height
    };
    const data = {
      json: this.props.data,
      stateColors: this.props.data.stateColors
    };
    console.log(data);
    this.props.saveChanges(data, this.props.title);
  }

  render() {
    return (
      <div className="map-chart-tools">
        <Title />
        <ChartDimensions />
        <FileOptions
          handleSubmit={this.handleSubmit}
          publishTheChart={this.props.publishTheChart}
          chartId={this.props.chartId}
          data={this.props.data}
          importMapDataFromFile={this.importMapDataFromFile}
          deleteChart={this.delete}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.mapChart.data,
  userId: state.user.id,
  title: state.mapChart.title
});

const mapDispatchToProps = dispatch => ({
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
  publishTheChart: chartId => {
    const action = publishChart(chartId);
    dispatch(action);
  },
  dispatchSetMapData: data => {
    const action = importMapData(data);
    dispatch(action);
  }
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MapChartTools)
);
