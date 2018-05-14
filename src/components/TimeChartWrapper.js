import { TimeChart } from '../components';
import React from 'react';
import { Button, Grid } from 'semantic-ui-react';
import Modal from 'react-modal';

export default class TimeChartWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorMode: true,
      modalIsOpen: false
    }
    this.toggleEditor = this.toggleEditor.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  //Function to open info pane in presentation mode or editing modal in editor mode
  handleClick(e) {
    if (!this.state.editorMode) {
      console.log(e)
    }
  }

  updateEvent(name, idx, color) {
    var dates = this.props.dates;
    dates[idx].name = name;
    dates[idx].color = color;
    this.setState({ dates });
  }

  toggleEditor() {
    this.setState({ editorMode: !this.state.editorMode })
  }

  openModal(e) {
    if (e.date !== undefined) {
      var modalContent = 'event';
      var modalContentEventId = e.name;
      var modalContentEventName = e.name;
      var modalContentEventColor = e.color;
    }

    this.setState({
      modalIsOpen: true,
      modalContent,
      modalContentEventId,
      modalContentEventName,
      modalContentEventColor,
    });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  closeAndSaveModal() {
    if (this.state.modalContent === 'link') {
      this.updateEvent(
        this.state.modalContentNodeName,
        this.state.modalContentNodeId,
        this.state.modalContentNodeColor
      );
      this.setState({ modalIsOpen: false });
    }
  }

  handleColorChange(color) {
    this.setState({ modalContentEventColor: color });
  }

  handleInputChange(key) {
    if (this.state.modalContent === 'link') {
      this.setState({ modalContentEventValue: key.target.value });
    }
  }


  render() {
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
                <TimeChart handleClick={this.handleClick} />
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
                  <h4>{header}</h4>
                  <hr />
                  <input
                    className="form-control"
                    defaultValue={modalValue}
                    onChange={this.handleInputChange}
                  />
                  <hr />
                  <div style={{ marginTop: '2em', marginBottom: '2em' }}>
                    <h4>{color}</h4>
                    <ColorPicker handleColorChange={this.handleColorChange} />
                  </div>
                  <div className="row">
                    <div className="col-xs-12">
                      <button
                        className="btn btn-primary btn-block"
                        onClick={this.closeAndSaveModal}
                      >
                        Apply Changes
                </button>
                    </div>
                  </div>
                </Modal>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }

}
