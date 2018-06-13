import React from 'react';
import { default as ReactModal } from 'react-modal';
import { modalStyle } from './constants';

ReactModal.setAppElement('#root');

const Modal = props => {
  return (
    <ReactModal
      closeTimeoutMS={150}
      isOpen={true}
      style={modalStyle}
    >
      <button
        type="button"
        className="close"
        onClick={props.closeModal}
      >
        <span aria-hidden="true">&times;</span>
      </button>
      {props.children}
    </ReactModal>
  );
};

export default Modal;
