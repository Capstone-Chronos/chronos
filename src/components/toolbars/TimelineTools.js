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
    const { data, title, chartId, editorMode } = this.props;
    return (
      <div className="toolbar">
        <h2>Tools</h2>
        <div className="toggleContainer">
          <div>
            <label>EDIT</label>
          </div>
          <div>
            <Checkbox
              onChange={this.props.toggleEditor}
              toggle
              label="PRESENT"
            />
          </div>
        </div>
        {editorMode ?
          <div className="tools">
            <h4>New Event</h4>
            <div className="form">
              <form className="stretch">
                <div className="tool-item">
                  <div className="ui fluid labeled input">
                    <div className="ui label">Year</div>
                    <input
                      type="text"
                      placeholder="2015"
                      onChange={this.handleChange}
                      name="year"
                    />
                  </div>
                </div>
                <div className="tool-item">
                  <div className="ui fluid labeled input">
                    <div className="ui label">Day</div>
                    <input
                      type="text"
                      placeholder="03"
                      onChange={this.handleChange}
                      name="day"
                    />
                  </div>
                </div>
                <div className="tool-item">
                  <div className="ui fluid labeled input">
                    <div className="ui label">Month</div>
                    <input
                      type="text"
                      placeholder="06"
                      onChange={this.handleChange}
                      name="month"
                    />
                  </div>
                </div>
                <div className="tool-item">
                  <Button
                    className="tool-button fluid"
                    name="submit"
                    onClick={this.submitEvent}
                  >
                    <i class="calendar plus icon" />
                    ADD EVENT
                </Button>
                </div>
              </form>
            </div>
            <h4>Edit Dimensions</h4>
            <div className="form">
              <form onSubmit={this.submitHeightWidth}>
                <div className="tool-item">
                  <div className="ui fluid labeled input">
                    <div className="ui label">Width</div>
                    <input
                      type="text"
                      placeholder={this.props.data.width || '1000'}
                      onChange={this.handleChange}
                      name="width"
                    />
                  </div>
                </div>
                <div className="tool-item">
                  <div className="ui fluid labeled input">
                    <div className="ui label">Height</div>
                    <input
                      type="text"
                      placeholder={this.props.data.height || '800'}
                      onChange={this.handleChange}
                      name="height"
                    />
                  </div>
                </div>
                <div className="tool-item">
                  <Button
                    className="tool-button fluid"
                    onClick={this.submitHeightWidth}
                  >
                    <i className="expand icon" />
                    RESIZE
                </Button>
                </div>
              </form>
              <h4>Edit Range (YYYY,MM,DD)</h4>
              <hr />
              <div className="form">
                <form onSubmit={this.submitRange}>
                  <div className="tool-item">
                    <div className="ui fluid labeled input">
                      <div className="ui label">Start</div>
                      <input
                        type="text"
                        placeholder={this.props.data.start}
                        onChange={this.handleChange}
                        name="start"
                      />
                    </div>
                  </div>
                  <div className="tool-item">
                    <div className="ui fluid labeled input">
                      <div className="ui label">End</div>
                      <input
                        type="text"
                        placeholder={this.props.data.end}
                        onChange={this.handleChange}
                        name="end"
                      />
                    </div>
                  </div>
                  <div className="tool-item">
                    <button
                      className="ui button tool-button fluid"
                      onClick={this.submitRange}
                    >
                      {/* <i className="arrows horizontal icon" /> */}
                      <i className="resize horizontal icon" />
                      UPDATE RANGE
                  </button>
                  </div>
                </form>
                <h4>Save Changes</h4>
                <hr />
                <div className="tool-item">
                  <Button
                    className="ui tool-button fluid"
                    onClick={this.handleUpdate}
                  >
                    <i className="save icon" />
                    SAVE UPDATES
                </Button>
                </div>
                {/* <div className="tool-item">
                <Button
                  className="ui tool-button fluid"
                  onClick={this.handleSubmit}
                >
                  <i className="copy icon" />
                  {this.props.chartId ? 'COPY' : 'SAVE'} AS NEW
                </Button>
              </div> */}
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
                    className="ui tool-button fluid"
                    color="red"
                    onClick={this.handleDelete}
                  >
                    <i className="trash icon" />
                    DELETE CHART
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
          :
          ""
        }
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
