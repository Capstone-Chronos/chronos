import { TimeChart, ColorPicker } from '../components';
import React from 'react';
import { Button, Grid, Input, TextArea } from 'semantic-ui-react';
import Modal from 'react-modal';

var testData = { radius: 10, dates: [{ id: 0, name: 'New Years 2016', date: new Date(2016, 0, 1) }, { id: 1, name: 'My birthday', date: new Date(2016, 3, 1) }, { id: 2, name: 'First Day of Summer', date: new Date(2016, 6, 21) }, { id: 3, name: 'New Years 2016', date: new Date(2017, 0, 1) }] }


export default class TimeChartWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dates: testData.dates,
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
              <div className="tools" style={{ margin: '3em' }}>
                <Button onClick={this.toggleEditor}>{this.state.editorMode ? 'Presentation Mode' : 'Editor Mode'}</Button>
              </div>
            </Grid.Column>
            <Grid.Column width="13">
              <div style={{ margin: '4em' }}>
                <TimeChart
                  handleClick={this.handleClick}
                  data={testData}
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
                      <iframe
                        width="250"
                        height="200"
                        src="https://www.youtube.com/embed/I47Y6VHc3Ms"
                        frameborder="0"
                        allow="autoplay; encrypted-media"
                        allowfullscreen>
                      </iframe>
                    </div>
                    :
                    <div>
                      <h4>{header}</h4>
                      <Input
                        label="Event Name"
                        labelPosition="left corner"
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
