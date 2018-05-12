import React from 'react';
import { ChromePicker } from 'react-color';

export default class ColorPicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      background: '#fff',
    }
  }

  handleChangeComplete = (color) => {
    this.props.handleColorChange(color.hex)
  };

  render() {
    return (
      <ChromePicker
        color={this.state.background}
        onChangeComplete={this.handleChangeComplete}
      />
    );
  }
}

