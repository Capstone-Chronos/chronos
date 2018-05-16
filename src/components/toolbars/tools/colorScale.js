const colorScale = (startColor, endColor, sections = 3) => {
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

  //==================================================================
  //===== Setup is complete, the actual calculation starts below =====
  //==================================================================

  let startRgb = hexStringToRgb('' + startColor),
    endRgb = hexStringToRgb('' + endColor);

  const min = [0, 1, 2].map(i => Math.min(startRgb[i], endRgb[i]));
  const max = [0, 1, 2].map(i => Math.max(startRgb[i], endRgb[i]));
  const interval = [0, 1, 2]
    .map(i => Math.floor((max[i] - min[i]) / (sections - 1)));

  console.log(startRgb, endRgb);
  console.log(min, max);
  console.log(interval);
};

export default colorScale;
