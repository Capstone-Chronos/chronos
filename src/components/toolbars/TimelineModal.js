import { Modal, Image, Button, Header, Icon, Input, TextArea } from 'semantic-ui-react';
import React from 'react';
import ColorPicker from './tools/ColorPicker';

const TimelineModal = (props) => {
  return (
    <Modal open={props.isOpen} large onClose={props.closeModal} closeIcon>
      {
        !props.editorMode ? (
          <div>
            <Modal.Header><h2>{props.eventName}</h2></Modal.Header>
            <Modal.Content image scrolling>
              {props.imgUrl && !props.vidUrl ? (
                <Image size='medium' wrapped src={props.imgUrl} width="300" height="200" />
              ) : (
                  ''
                )}
              {props.vidUrl ? (
                <iframe
                  width="250"
                  height="200"
                  src={props.vidUrl}
                  frameborder="0"
                  allow="autoplay; encrypted-media"
                  allowfullscreen
                />
              ) : (
                  ''
                )}
              <Modal.Description>
                <p>{props.description}</p>
              </Modal.Description>
              <Button primary onClick={props.closeModal}>
                Done <Icon name='right chevron' />
              </Button>
            </Modal.Content>
          </div>
        ) : (
            <div>
              <Modal.Content>
                <h4>{props.header}</h4>
                <Input
                  label="Event Name"
                  name="modalContentEventName"
                  defaultValue={props.eventName}
                  className="form-control fluid"
                  onChange={props.handleInputChange}
                />
                <TextArea
                  label="Event Description"
                  name="modalContentEventDescription"
                  defaultValue={props.description}
                  className="form-control fluid"
                  value={props.description}
                  onInput={props.handleInputChange}
                />
                <Input
                  label="Image URL"
                  name="modalContentEventImgUrl"
                  defaultValue={props.imgUrl}
                  className="form-control fluid"
                  onChange={props.handleInputChange}
                />
                <Input
                  label="Video URL"
                  name="modalContentEventVidUrl"
                  defaultValue={props.vidUrl}
                  className="form-control fluid"
                  onChange={props.handleInputChange}
                />
                <Input
                  label="Event Size"
                  name="modalContentEventRadius"
                  defaultValue={props.radius}
                  className="form-control fluid"
                  onChange={props.handleInputChange}
                />
                <Input
                  label="Event Height"
                  name="modalContentEventHeight"
                  defaultValue={props.height}
                  className="form-control fluid"
                  onChange={props.handleInputChange}
                />
                <hr />
                <div style={{ marginTop: '2em', marginBottom: '2em' }}>
                  <h4>{props.color}</h4>
                  <ColorPicker
                    handleColorChange={props.handleColorChange}
                  />
                </div>
                <div className="row">
                  <div>
                    <Button onClick={props.closeAndSaveModal}>
                      Apply Changes
                    </Button>
                  </div>
                </div>
              </Modal.Content>
            </div>
          )
      }
    </Modal>
  )
}

export default TimelineModal;