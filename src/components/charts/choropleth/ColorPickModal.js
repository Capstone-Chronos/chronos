import React from 'react';
import { connect } from 'react-redux';
import { updateMapColors } from '../../../store/mapChart';
import Modal from './modal';
import ColorPicker from '../../toolbars/tools/ColorPicker';

class ColorPickModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedColor: ''
    };

    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleColorChange(hexcode) {
    this.setState({ selectedColor: hexcode });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    let { selectedColor } = this.state;
    let { stateId, dispatchColors, closeModal } = this.props;

    dispatchColors({ [stateId]: selectedColor });
    closeModal();
  }

  render() {
    let { stateId, closeModal } = this.props;
    let { handleColorChange, handleSubmit } = this;
    return (
      <Modal closeModal={closeModal}>
        <form onSubmit={handleSubmit}>
          <h4>{stateId}</h4>
          <ColorPicker handleColorChange={handleColorChange} />
          <input type="submit" value="Submit" />
        </form>
      </Modal>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  dispatchColors: stateColorObj => {
    const action = updateMapColors(stateColorObj);
    dispatch(action);
  },
  closeModal: ownProps.closeModal,
  stateId: ownProps.stateId
});

export default connect(null, mapDispatchToProps)(ColorPickModal);
