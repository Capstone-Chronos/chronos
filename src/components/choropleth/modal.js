import React from 'react';
import Modal from 'react-modal';
import modalStyle from './modalStyle';

const CustomModal = props => (
  <Modal
    closeTimeoutMS={150}
    isOpen={true}
    style={modalStyle}
  >
    <button
      type="button"
      className="close"
      onClick={props.toggleModal}
    >
      <span aria-hidden="true">&times;</span>
    </button>
    {props.children}
  </Modal>
);

export default CustomModal;
