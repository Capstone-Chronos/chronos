import React from 'react';
import { ChromePicker } from 'react-color';

export default class ColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      background: '#fff'
    };
    this.handleChangeComplete = this.handleChangeComplete.bind(this);
  }

  handleChangeComplete = color => {
    this.setState({ background: color.hex });
    this.props.handleColorChange(color.hex);
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

export const colorScale = (startColor, endColor, sections = 3) => {
  const hexToDec = hexNum => parseInt(hexNum, 16);
  const decToHex = decNum => {
    let str = decNum.toString(16);
    return (str.length === 1 ? '0' : '') + str;
  };

  const hexStringToRgb = hexString => 
    [hexString.slice(1, 3), hexString.slice(3, 5), hexString.slice(5, 7)]
      .map(hexNum => hexToDec(hexNum));

  const rgbToHexString = rgbArr => 
    '#' + rgbArr.map(rgbNum => decToHex(rgbNum)).join('');

  const addRgb = (arr1, arr2, n = 1) =>
    [arr1[0] + n * arr2[0], arr1[1] + n * arr2[1], arr1[2] + n * arr2[2]];

  const rgbDiff = (arr1, arr2) =>
    addRgb(arr1, arr2, -1).map(num =>
      (num < 0 ? -1 : 1) * Math.floor(num / (sections - 1)));

  //================================================================
  //=====Setup is complete, the actual calculation starts below=====
  //================================================================

  let startRgb = hexStringToRgb('' + startColor),
    endRgb = hexStringToRgb('' + endColor);
  let rgbInc = rgbDiff(startRgb, endRgb);

  let output = [startRgb, endRgb, rgbInc].map(arr => rgbToHexString(arr));
  console.log(output);
};
