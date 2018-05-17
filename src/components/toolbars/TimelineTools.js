import React, { Component } from 'react';
import { Button, Input, Checkbox } from 'semantic-ui-react';
import { FooterBar, PublishButton } from '../../components';
import { connect } from 'react-redux';
import {
  saveExistingChart,
  publishChart,
  deleteChart
} from '../../database/charts';
import {
  clearTimelineData,
  saveTimelineThunk,
  saveExistingTimelineThunk
} from '../../store/timeline';

class TimelineTools extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      height: 800,
      width: 800,
      start: '2001,01,01',
      end: '2020,01,01'
    };

    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitHeightWidth = this.submitHeightWidth.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.submitEvent = this.submitEvent.bind(this);
    this.submitRange = this.submitRange.bind(this);
  }

  componentDidMount() {
    this.setState({
      height: this.props.data.height,
      width: this.props.data.width,
      start: this.props.data.start,
      end: this.props.data.end
    });
  }

  toggleVisibility = () => this.setState({ visible: !this.state.visible });

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  submitEvent(evt) {
    evt.preventDefault();
    this.props.addEvent(
      this.state.name,
      this.state.year,
      this.state.day,
      this.state.month
    );
  }

  submitHeightWidth(evt) {
    evt.preventDefault();
    this.props.changeHeight(this.state.height);
    this.props.changeWidth(this.state.width);
  }

  handleUpdate() {
    const { data, chartId } = this.props;
    this.props.dispatchSaveExistingChart(data, chartId);
  }

  handleSubmit() {
    const { data, title } = this.props;
    this.props.dispatchSaveNewChart(data, title);
  }

  handleDelete() {
    const { chartId, uid } = this.props;
    console.log('Delete');
    deleteChart(chartId, uid);
  }

  submitRange(evt) {
    evt.preventDefault();
    this.props.updateRange(this.state.start, this.state.end);
  }

  render() {
    const { data, title, chartId } = this.props;
    return (
      <div>
        <h2>Tools</h2>
        <label>Edit</label>
        <Checkbox onChange={this.props.toggleEditor} toggle label="Present" />
        <div className="tools">
          <h4>New Event</h4>
          <hr />
          <div className="form">
            <form>
              <div className="tool-item">
                <Input onChange={this.handleChange} name="name" label="Name" />
              </div>
              <div className="tool-item">
                <Input onChange={this.handleChange} name="year" label="Year" />
              </div>
              <div className="tool-item">
                <Input onChange={this.handleChange} name="day" label="Day" />
              </div>
              <div className="tool-item">
                <Input
                  onChange={this.handleChange}
                  name="month"
                  label="Month"
                />
              </div>
              <div className="tool-item">
                <Button
                  className="tool-button"
                  name="submit"
                  onClick={this.submitEvent}
                >
                  Create new event
                </Button>
              </div>
            </form>
          </div>
          <h4>Edit Chart Dimensions</h4>
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
            <h4>Edit Start and End Date (yyyy, mm, dd)</h4>
            <hr />
            <div className="form">
              <form onSubmit={this.submitHeightWidth}>
                <div className="tool-item">
                  <Input
                    onChange={this.handleChange}
                    name="start"
                    label="Start"
                    defaultValue={this.props.start}
                  />
                </div>
                <div className="tool-item">
                  <Input
                    onChange={this.handleChange}
                    name="end"
                    label="End"
                    defaultValue={this.props.end}
                  />
                </div>
                <div className="tool-item">
                  <Button className="tool-button" onClick={this.submitRange}>
                    Update date range
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
              </div>
              <div className="tool-item">
                <FooterBar
                  data={this.props.data}
                  readFile={this.props.readFile}
                  emptyDiagram={this.props.dispatchClearChart}
                  uploadData={this.props.uploadData}
                />
              </div>
              <div className="tool-item">
                <Button
                  className="tool-button"
                  color="red"
                  onClick={this.handleDelete}
                >
                  Delete Chart
                </Button>
              </div>
              <div className="tool-item">
                <PublishButton
                  chartId={this.props.chartId}
                  title={this.props.title}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    chartId: state.timeline.chartId,
    data: state.timeline.data,
    title: state.timeline.title,
    uid: state.user.uid
  };
};

const mapDispatchToProps = dispatch => ({
  dispatchClearChart: () => dispatch(clearTimelineData()),
  dispatchSaveNewChart: (data, title) => {
    console.log('CALLING DISPATCHED FUNC');
    dispatch(saveTimelineThunk(data, title, 'Timeline'));
  },
  dispatchSaveExistingChart: (data, chartId) => {
    const action = saveExistingTimelineThunk(data, chartId);
    dispatch(action);
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TimelineTools);
