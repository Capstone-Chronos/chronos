import { Timeline, ColorPicker } from '../components';
import React from 'react';
import {
  Button,
  Grid,
  Input,
  TextArea,
  Image,
  Modal,
  Icon
} from 'semantic-ui-react';
import TimelineModal from './toolbars/TimelineModal';
import TimelineTools from './toolbars/TimelineTools';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';
import { connect } from 'react-redux';
import {
  loadDefaultData,
  clearTimelineData,
  importDataFromFile,
  saveTimelineThunk,
  updateEvents,
  updateTimelineHeight,
  updateTimelineWidth,
  updateTimelineRange,
  updateTitle,
  fetchTimelineByIdThunk
} from '../store/timeline';

class TimelineWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorMode: true,
      modalIsOpen: false
    };

    this.toggleEditor = this.toggleEditor.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.closeAndSaveModal = this.closeAndSaveModal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.updateEvent = this.updateEvent.bind(this);
    this.updateRange = this.updateRange.bind(this);
    this.changeHeight = this.changeHeight.bind(this);
    this.changeWidth = this.changeWidth.bind(this);
    this.addEvent = this.addEvent.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.setTitle = this.setTitle.bind(this);
  }

  async componentDidMount() {
    console.log(
      'Timeline Wrapper MOUNTED with chartId:',
      this.props.match.params.id
    );
    const chartId = this.props.match.params.id;
    if (chartId) this.props.dispatchGetChartData(chartId);
  }

  addEvent(name, year, day, month) {
    var dates = this.props.data.dates || [];
    var newDate = `${year}, ${month}, ${day}`;
    var idx = dates.length;
    name = name || 'Event' + idx;
    dates[idx] = {
      id: idx,
      name,
      date: newDate,
      height: 200
    };
    this.props.dispatchAddEvent(dates);
  }

  //Function to open info pane in presentation mode or editing modal in editor mode
  handleClick(e) {
    if (!this.state.editorMode) {
      console.log(e);
    }
  }

  updateRange(start, end) {
    console.log(start, end);
    start = start || this.props.data.start;
    end = end || this.props.data.end;
    this.props.dispatchUpdateRange(start, end);
  }

  updateEvent(name, idx, color, description, imgUrl, vidUrl, radius, height) {
    var dates = this.props.data.dates;
    dates[idx].name = name || '';
    dates[idx].color = color || '#1D59B0';
    dates[idx].description = description;
    dates[idx].imgUrl = imgUrl || '';
    dates[idx].vidUrl = vidUrl || '';
    dates[idx].radius = radius || 5;
    dates[idx].height = height || 200;
    // this.setState({ dates });
    this.props.dispatchUpdateEvents(dates);
  }

  toggleEditor() {
    this.setState({ editorMode: !this.state.editorMode });
  }

  openModal(e) {
    if (e.date !== undefined) {
      var modalContent = 'event';
      var modalContentEventId = e.id;
      var modalContentEventName = e.name;
      var modalContentEventColor = e.color;
      var modalContentEventDescription = e.description;
      var modalContentEventImgUrl = e.imgUrl;
      var modalContentEventVidUrl = e.vidUrl;
      var modalContentEventRadius = e.radius;
      var modalContentEventHeight = e.height;
      var modalContentEventDate = e.date;
    }

    this.setState({
      modalIsOpen: true,
      modalContent,
      modalContentEventId,
      modalContentEventName,
      modalContentEventColor,
      modalContentEventDescription,
      modalContentEventImgUrl,
      modalContentEventVidUrl,
      modalContentEventRadius,
      modalContentEventHeight,
      modalContentEventDate
    });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  closeAndSaveModal() {
    this.updateEvent(
      this.state.modalContentEventName,
      this.state.modalContentEventId,
      this.state.modalContentEventColor,
      this.state.modalContentEventDescription,
      this.state.modalContentEventImgUrl,
      this.state.modalContentEventVidUrl,
      this.state.modalContentEventRadius,
      this.state.modalContentEventHeight
    );
    this.setState({ modalIsOpen: false });
  }

  setTitle(evt) {
    console.log(evt.target.title.value);
    evt.preventDefault();
    this.props.updateTheTitle(evt.target.title.value);
  }

  handleColorChange(color) {
    this.setState({ modalContentEventColor: color });
  }

  handleInputChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  changeHeight(newHeight) {
    // this.setState({ height: newHeight });
    this.props.dispatchChangeHeight(newHeight);
  }

  changeWidth(newWidth) {
    // this.setState({ width: newWidth });
    this.props.dispatchChangeWidth(newWidth);
  }

  render() {
    return (
      <div className="chartContainer">
        <Grid>
          <Grid.Row>
            <Grid.Column width='3' verticalAlign='center' textAlign='center'>
              <TimelineTools
                editorMode={this.state.editorMode}
                changeHeight={this.changeHeight}
                changeWidth={this.changeWidth}
                toggleEditor={this.toggleEditor}
                addEvent={this.addEvent}
                updateRange={this.updateRange}
                data={this.props.data}
              />
            </Grid.Column>
            <Grid.Column width="13">
              <h2>{this.props.title}</h2>
              {this.state.editorMode ? (
                <form onSubmit={this.setTitle}>
                  <input
                    type="text"
                    name="title"
                    placeholder="Change Title Here"
                    value={this.state.title}
                  />
                  <input type="submit" value="Update Title" />
                </form>
              ) : (
                  <div style={{margin: '3em'}}>
                  </div>
                )}
              <div style={{ margin: '4em' }}>
                <Timeline
                  handleClick={this.handleClick}
                  data={this.props.data}
                  openModal={this.openModal}
                />
              </div>
              <TimelineModal
                closeIcon
                size="large"
                closeOnDocumentClick="true"
                closeOnDimmerClick="true"
                closeModal={this.closeModal}
                handleInputChange={this.handleInputChange}
                handleColorChange={this.handleColorChange}
                closeAndSaveModal={this.closeAndSaveModal}
                editorMode={this.state.editorMode}
                eventName={this.state.modalContentEventName}
                eventColor={this.state.modalContentEventColor}
                description={this.state.modalContentEventDescription}
                imgUrl={this.state.modalContentEventImgUrl}
                vidUrl={this.state.modalContentEventVidUrl}
                radius={this.state.modalContentEventRadius}
                height={this.state.modalContentEventHeight}
                color={this.state.modalContentEventColor}
                date={this.state.modalContentEventDate}
                isOpen={this.state.modalIsOpen}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    chartID: state.timeline.chartId,
    data: state.timeline.data,
    // height: state.timeline.data.height,
    // width: state.timeline.data.width,
    title: state.timeline.title,
    uid: state.user.uid
  };
};
const mapDispatchToProps = dispatch => {
  return {
    dispatchAddEvent: dates => {
      const action = updateEvents(dates);
      dispatch(action);
    },
    dispatchUpdateEvents: dates => {
      const action = updateEvents(dates);
      dispatch(action);
    },
    dispatchChangeHeight: newHeight => {
      const action = updateTimelineHeight(newHeight);
      dispatch(action);
    },
    dispatchChangeWidth: newWidth => {
      const action = updateTimelineWidth(newWidth);
      dispatch(action);
    },
    dispatchEmptyChart: () => {
      const action = clearTimelineData();
      dispatch(action);
    },
    dispatchUpdateRange: (start, end) => {
      const action = updateTimelineRange(start, end);
      dispatch(action);
    },
    updateTheTitle: title => {
      const action = updateTitle(title);
      dispatch(action);
    },
    dispatchGetChartData: chartId => {
      const action = fetchTimelineByIdThunk(chartId);
      dispatch(action);
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TimelineWrapper)
);
