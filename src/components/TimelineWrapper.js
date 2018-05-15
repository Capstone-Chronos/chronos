import { Timeline, ColorPicker } from '../components';
import React from 'react';
import { Button, Grid, Input, TextArea, Image } from 'semantic-ui-react';
import Modal from 'react-modal';
import TimelineTools from './toolbars/TimelineTools';
// import firebase from 'firebase';
// import { connect } from 'react-redux';
// import {
//   loadDefaultData,
//   clearData,
//   importData,
//   updateSankeyChartThunk,
//   saveSankeyChartThunk
// } from '../store/timeLine';
// import {
//   deleteChart,
//   updateChart,
//   fetchChartById
// } from '../database/sankeyChart';

var testData = { height: 800, width: 1200, start: '2015, 1, 1', end: '2018, 1, 1', radius: 10, dates: [{ id: 0, name: 'New Years 2016', date: '2016, 1, 1' }, { id: 1, name: 'My birthday', date: '2016, 3, 1' }, { id: 2, name: 'First Day of Summer', date: '2016, 6, 21' }, { id: 3, name: 'New Years 2016', date: '2017, 1, 1' }] }


export default class TimelineWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorMode: true,
      modalIsOpen: false
    }

    this.toggleEditor = this.toggleEditor.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.closeAndSaveModal = this.closeAndSaveModal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.updateEvent = this.updateEvent.bind(this);
    this.changeHeight = this.changeHeight.bind(this);
    this.changeWidth = this.changeWidth.bind(this);
    this.addEvent = this.addEvent.bind(this);
  }

  addEvent(name, year, day, month) {
    var dates = this.state.dates;
    var newDate = `${year}, ${day}, ${month}`;
    var idx = dates.length;
    name = name || 'Event' + idx;
    dates[idx] = {
      id: idx,
      name,
      date: newDate
    }
  }

  componentWillMount() {
    this.setState({
      radius: testData.radius,
      dates: testData.dates,
      height: testData.height,
      width: testData.width,
      start: testData.start,
      end: testData.end
    })
  }

  //Function to open info pane in presentation mode or editing modal in editor mode
  handleClick(e) {
    if (!this.state.editorMode) {
      console.log(e)
    }
  }

  updateEvent(name, idx, color, description, imgUrl, vidUrl) {
    var dates = this.state.dates;
    dates[idx].name = name;
    dates[idx].color = color;
    dates[idx].description = description;
    dates[idx].imgUrl = imgUrl;
    dates[idx].vidUrl = vidUrl;
    this.setState({ dates });
  }

  toggleEditor() {
    this.setState({ editorMode: !this.state.editorMode })
  }

  openModal(e) {
    console.log(e)
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
      <div className='chartContainer'>
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
              />
            </Grid.Column>
            <Grid.Column width="13">
              <div style={{ margin: '4em' }}>
                <Timeline
                  handleClick={this.handleClick}
                  data={this.state}
                  openModal={this.openModal} />
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
                  {!this.state.editorMode ?
                    <div>
                      <h2>{eventName}</h2>
                      <hr />
                      {imgUrl ?
                        <Image src={imgUrl} width="300" height="200" />
                        :
                        ""
                      }
                      <p>{description}</p>
                      {vidUrl ? <iframe
                        width="250"
                        height="200"
                        src={vidUrl}
                        frameborder="0"
                        allow="autoplay; encrypted-media"
                        allowfullscreen>
                      </iframe>
                        :
                        ""
                      }
                    </div>
                    :
                    <div>
                      <h4>{header}</h4>
                      <Input
                        label="Event Name"
                        name='modalContentEventName'
                        defaultValue={eventName}
                        className="form-control"
                        fluid
                        onChange={this.handleInputChange}
                      />
                      <TextArea
                        label="Event Description"
                        name='modalContentEventDescription'
                        defaultValue={description}
                        className='form-control'
                        style={{ maxWidth: modalWidth - 50, minHeight: 50 }}
                        fluid
                        value={description}
                        onInput={this.handleInputChange}
                      />
                      <Input
                        label="Image URL"
                        name='modalContentEventImgUrl'
                        defaultValue={imgUrl}
                        className='form-control'
                        fluid
                        onChange={this.handleInputChange}
                      />
                      <Input
                        label="Video URL"
                        name='modalContentEventVidUrl'
                        defaultValue={vidUrl}
                        className='form-control'
                        fluid
                        onChange={this.handleInputChange}
                      />
                      <hr />
                      <div style={{ marginTop: '2em', marginBottom: '2em' }}>
                        <h4>{color}</h4>
                        <ColorPicker handleColorChange={this.handleColorChange} />
                      </div>
                      <div className="row">
                        <div>
                          <Button
                            onClick={this.closeAndSaveModal}
                          >
                            Apply Changes
                          </Button>
                        </div>
                      </div>
                    </div>
                  }
                </Modal>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }

}

// const userId = firebase.auth().currentUser;

// const mapStateToProps = storeState => {
//   console.log(storeState);
//   return {
//     data: storeState.sankeyChart.data,
//     height: storeState.sankeyChart.height,
//     width: storeState.sankeyChart.width,
//     userId: storeState.user.id,
//     chartId: storeState.sankeyChart.chartIdKey,
//     title: 'Fake Title'
//   };
// };

// const mapDispatchToProps = function (dispatch) {
//   return {
//     fetchDefaultData: () => {
//       const action = loadDefaultData();
//       dispatch(action);
//     },
//     clearChart: () => {
//       const action = clearData();
//       dispatch(action);
//     },
//     saveChanges: (data, title) => {
//       console.log('TTTTTTTT');
//       const action = saveSankeyChartThunk(data, title);
//       dispatch(action);
//     },
//     uploadData: data => {
//       const action = importData(data);
//       dispatch(action);
//     }
//   }
// }