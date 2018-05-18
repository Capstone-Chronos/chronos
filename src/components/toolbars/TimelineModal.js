import { Modal, Image, Button, Header, Icon, Input, TextArea, Form } from 'semantic-ui-react';
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
                <Image fluid wrapped src={props.imgUrl} />
              ) : (
                  ''
                )}
              {props.vidUrl ? (
                <div style={{margin:'3em'}}>
                  <iframe
                    width="800"
                    height="400"
                    src={props.vidUrl}
                    frameborder="0"
                    allow="autoplay; encrypted-media"
                    allowfullscreen
                  />
                </div>
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
            <Modal.Content>
              <Modal.Header><h2>Edit Event</h2></Modal.Header>
              <div className='modal-form'>
                <Form>
                  <Form.Field>
                    <label>Event Name</label>
                    <Input
                      name="modalContentEventName"
                      defaultValue={props.eventName}
                      onChange={props.handleInputChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Event Description</label>
                    <TextArea
                      name="modalContentEventDescription"
                      defaultValue={props.description}
                      value={props.description}
                      onInput={props.handleInputChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Image URL</label>
                    <Input
                      name="modalContentEventImgUrl"
                      defaultValue={props.imgUrl}
                      onChange={props.handleInputChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Video URL</label>
                    <Input
                      name="modalContentEventVidUrl"
                      defaultValue={props.vidUrl}
                      onChange={props.handleInputChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Event Size</label>
                    <Input
                      type='number'
                      size='small'
                      name="modalContentEventRadius"
                      defaultValue={props.radius}
                      onChange={props.handleInputChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Event Height</label>
                    <Input
                      type='number'
                      size='small'
                      name="modalContentEventHeight"
                      defaultValue={props.height}
                      onChange={props.handleInputChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Choose Event Color</label>
                    <ColorPicker
                      handleColorChange={props.handleColorChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Button onClick={props.closeAndSaveModal}>
                      Apply Changes
                    </Button>
                  </Form.Field>
                </Form>
              </div>
            </Modal.Content>
          )
      }
    </Modal>
  )
}

export default TimelineModal;