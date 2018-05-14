import {select} from 'd3-selection';
import {geoPath, geoAlbersUsa} from 'd3-geo';
import { colors } from './constants';
import { json as readJSON } from 'd3';
import { mapWidth, mapHeight } from './constants';

const renderMap = function() {
  const node = this.node;

  const projection = geoAlbersUsa()
    .translate([mapWidth / 2, mapHeight / 2])
    .scale([1100]);

  const path = geoPath().projection(projection);
  readJSON('https://d3js.org/us-10m.v1.json', (err, usStates) => {
    if (err) throw err;

    select(node)
      .selectAll('path')
      .data(usStates.features)
      .enter()
      .append('path')
      .attr('d', path)
      .attr('id', data => 'state' + Number(data.id))
      .style('stroke', colors.strokeDisabled)
      .style('fill', () => { })
      .on('click', data => { });
  });
};

export default renderMap;
