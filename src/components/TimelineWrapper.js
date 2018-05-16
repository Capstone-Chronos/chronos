import { Timeline, ColorPicker } from '../components';
import React from 'react';
import { Button, Grid, Input, TextArea, Image } from 'semantic-ui-react';
import Modal from 'react-modal';
import TimelineTools from './toolbars/TimelineTools';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';
import { connect } from 'react-redux';
import {
  loadDefaultData,
  clearData,
  importData,
  updateSankeyChartThunk,
  saveTimelineThunk
} from '../store/timeline';
import { updateChart, fetchChartById } from '../database/charts';

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
  }

  componentDidMount() {
    fetchChartById(this.props.match.params.id);
    this.updateRange = this.updateRange.bind(this);
  }

  addEvent(name, year, day, month) {
    var dates = this.props.data.dates;
    var newDate = `${year}, ${month}, ${day}`;
    var idx = dates.length;
    name = name || 'Event' + idx;
    dates[idx] = {
      id: idx,
      name,
      date: newDate
    };
    this.setState({ dates });
  }

  componentWillMount() {
    this.setState({
      radius: this.props.data.radius,
      dates: this.props.data.dates,
      height: this.props.data.height,
      width: this.props.data.width,
      start: this.props.data.start,
      end: this.props.data.end
    });
  }

  //Function to open info pane in presentation mode or editing modal in editor mode
  handleClick(e) {
    if (!this.state.editorMode) {
      console.log(e);
    }
  }

  updateRange(start, end) {
    console.log(start, end)
    this.setState({
      start: start || this.state.start,
      end: end || this.state.end
    });
  }

  updateEvent(name, idx, color, description, imgUrl, vidUrl) {
    var dates = this.props.data.dates;
    dates[idx].name = name;
    dates[idx].color = color;
    dates[idx].description = description;
    dates[idx].imgUrl = imgUrl;
    dates[idx].vidUrl = vidUrl;
    this.setState({ dates });
  }

  toggleEditor() {
    this.setState({ editorMode: !this.state.editorMode });
  }

  openModal(e) {
    console.log(e);
    if (e.date !== undefined) {
      var modalContent = 'event';
      var modalContentEventId = e.id;
      var modalContentEventName = e.name;
      var modalContentEventColor = e.color;
      var modalContentEventDescription = e.description;
      var modalContentEventImgUrl = e.imgUrl;
      var modalContentEventVidUrl = e.vidUrl;
    }

    this.setState({
      modalIsOpen: true,
      modalContent,
      modalContentEventId,
      modalContentEventName,
      modalContentEventColor,
      modalContentEventDescription,
      modalContentEventImgUrl,
      modalContentEventVidUrl
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
      this.state.modalContentEventVidUrl
    );
    this.setState({ modalIsOpen: false });
  }

  handleColorChange(color) {
    this.setState({ modalContentEventColor: color });
  }

  handleInputChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  changeHeight(newHeight) {
    this.setState({ height: newHeight });
  }

  changeWidth(newWidth) {
    this.setState({ width: newWidth });
  }

  render() {
    var eventName = this.state.modalContentEventName;
    var eventColor = this.state.modalContentEventColor;
    var description = this.state.modalContentEventDescription;
    var imgUrl = this.state.modalContentEventImgUrl;
    var vidUrl = this.state.modalContentEventVidUrl;
    var header = 'Update Event';
    var color = 'Change Event Color';
    if (this.state.editorMode) {
      var modalWidth = 400;
    } else {
      var modalWidth = 500;
    }

    var modalStyle = {
      content: {
        top: '200px',
        left: '37%',
        right: 'auto',
        bottom: 'auto',
        border: '0px solid #333',
        width: modalWidth
      },
      overlay: {
        backgroundColor: 'rgba(0, 0, 0 , 0.35)'
      }
    };

    return (
      <div className="chartContainer">
        <Grid>
          <Grid.Row>
            <Grid.Column width="3">
              <TimelineTools
                changeHeight={this.changeHeight}
                changeWidth={this.changeWidth}
                toggleEditor={this.toggleEditor}
                width={this.state.width}
                height={this.state.height}
                addEvent={this.addEvent}
                updateRange={this.updateRange}
                start={this.state.start}
                end={this.state.end}
                data={this.state}
              />
            </Grid.Column>
            <Grid.Column width="13">
              <div style={{ margin: '4em' }}>
                <Timeline
                  handleClick={this.handleClick}
                  data={this.state}
                  openModal={this.openModal}
                />
                <Modal
                  closeTimeoutMS={150}
                  isOpen={this.state.modalIsOpen}
                  editorMode={this.state.editorMode}
                  onRequestClose={this.handleModalCloseRequest}
                  style={modalStyle}
                >
                  <button className="close" onClick={this.closeModal}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                  {!this.state.editorMode ? (
                    <div>
                      <h2>{eventName}</h2>
                      <hr />
                      {imgUrl ? (
                        <Image src={imgUrl} width="300" height="200" />
                      ) : (
                          ''
                        )}
                      <p>{description}</p>
                      {vidUrl ? (
                        <iframe
                          width="250"
                          height="200"
                          src={vidUrl}
                          frameborder="0"
                          allow="autoplay; encrypted-media"
                          allowfullscreen
                        />
                      ) : (
                          ''
                        )}
                    </div>
                  ) : (
                      <div>
                        <h4>{header}</h4>
                        <Input
                          label="Event Name"
                          name="modalContentEventName"
                          defaultValue={eventName}
                          className="form-control fluid"
                          onChange={this.handleInputChange}
                        />
                        <TextArea
                          label="Event Description"
                          name="modalContentEventDescription"
                          defaultValue={description}
                          className="form-control fluid"
                          style={{ maxWidth: modalWidth - 50, minHeight: 50 }}
                          value={description}
                          onInput={this.handleInputChange}
                        />
                        <Input
                          label="Image URL"
                          name="modalContentEventImgUrl"
                          defaultValue={imgUrl}
                          className="form-control fluid"
                          onChange={this.handleInputChange}
                        />
                        <Input
                          label="Video URL"
                          name="modalContentEventVidUrl"
                          defaultValue={vidUrl}
                          className="form-control fluid"
                          onChange={this.handleInputChange}
                        />
                        <hr />
                        <div style={{ marginTop: '2em', marginBottom: '2em' }}>
                          <h4>{color}</h4>
                          <ColorPicker
                            handleColorChange={this.handleColorChange}
                          />
                        </div>
                        <div className="row">
                          <div>
                            <Button onClick={this.closeAndSaveModal}>
                              Apply Changes
                          </Button>
                          </div>
                        </div>
                      </div>
                    )}
                </Modal>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.timeline.data,
    height: state.timeline.data.height,
    width: state.timeline.data.width
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TimelineWrapper)
);
