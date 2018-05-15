import React from 'react';
import { default as ReactModal } from 'react-modal';
import { modalStyle } from './constants';

const Modal = props => (
  <ReactModal
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
  </ReactModal>
);

export default Modal;
