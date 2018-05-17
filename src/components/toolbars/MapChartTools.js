import React, { Component } from 'react';
import { loadData, readFile } from './../toolbars/SankeyUtils/utils';
import {
  deleteChart,
  saveExistingChart,
  fetchChartById,
  publishChart
} from '../../database/charts';
import {
  loadDefaultData,
  clearMapData,
  importData,
  saveMapChartThunk,
  updateTitle
} from '../../store';
import { connect } from 'react-redux';
import { Button, Input } from 'semantic-ui-react';
import FooterBar from './SankeyUtils/FooterBar';
import PublishButton from './tools/PublishButton';
import { withRouter } from 'react-router-dom';

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

    this.emptyDiagram = this.emptyDiagram.bind(this);

    this.loadData = loadData.bind(this);
    this.readFile = readFile.bind(this);
    this.delete = this.delete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }
  componentDidMount() {
    fetchChartById(this.props.match.params.id);
  }

  setTitle(evt) {
    evt.preventDefault();
    console.log(evt.target.title.value);
    this.props.updateTheTitle(evt.target.title.value);
  }

  emptyDiagram() {
    console.log('props', this.props);
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

  toggleVisibility = () => this.setState({ visible: !this.state.visible });

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleUpdate() {
    let { data, chartId } = this.props;
    saveExistingChart(data, chartId);
  }

  handleSubmit() {
    console.log(this.props, this.props.data);
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
      <div>
        <div>
          <h2>{this.props.title}</h2>
          <form onSubmit={this.setTitle}>
            <input
              type="text"
              name="title"
              placeholder="Change Title Here"
              value={this.state.title}
            />
            <input type="submit" value="Update Title" />
          </form>
        </div>
        <h4>Edit Chart Dimensions</h4>
        <hr />
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
              <Button className="tool-button" onClick={this.submitHeightWidth}>
                Update chart size
              </Button>
            </div>
          </form>
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
            <FooterBar
              data={this.props.data}
              readFile={this.props.readFile}
              emptyDiagram={this.emptyDiagram}
            />
          </div>
          <div className="tool-item">
            <Button className="tool-button" color="red" onClick={this.delete}>
              Delete Chart
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  console.log('i', state);
  return {
    data: state.mapChart.data,
    userId: state.user.id,
    chartId: state.mapChart.chartId,
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
    loadData: data => {
      const action = importData(data);
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MapChartTools)
);
