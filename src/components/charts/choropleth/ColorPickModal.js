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
    let { targetId, dispatchColors, closeModal } = this.props;

    dispatchColors({ [targetId]: selectedColor });
    closeModal();
  }

  render() {
    let { targetId, closeModal } = this.props;
    return (
      <Modal closeModal={closeModal}>
        <form onSubmit={this.handleSubmit}>
          <h4>{targetId}</h4>
          <ColorPicker handleColorChange={this.handleColorChange} />
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
  targetId: ownProps.targetId
});

export default connect(null, mapDispatchToProps)(ColorPickModal);
