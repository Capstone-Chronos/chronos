const colorScale = (startHexStr, endHexStr, sections = 3) => {
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

  let startRgb = hexStringToRgb('' + startHexStr),
    endRgb = hexStringToRgb('' + endHexStr);

  const min = [0, 1, 2].map(i => Math.min(startRgb[i], endRgb[i]));
  const max = [0, 1, 2].map(i => Math.max(startRgb[i], endRgb[i]));
  const startToEnd = i => (startRgb[i] < endRgb[i] ? 1 : -1);
  const interval = [0, 1, 2]
    .map(i =>
      startToEnd(i) * Math.floor((max[i] - min[i]) / (sections - 1)));
  const addInterval = (arr1, arr2) => arr1.map((n, i) => n + arr2[i]);

  let output = [startRgb];
  for(let i = 0; i < sections - 2; i++) {
    output.push(addInterval(output[output.length - 1], interval));
  }
  output.push(endRgb);
  output = output.map(rgb => rgbToHexString(rgb));

  return output;
};

export default colorScale;
