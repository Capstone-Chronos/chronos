import { select } from 'd3-selection';
import { json as readJSON } from 'd3';
import { mesh, feature } from 'topojson';
import { geoPath } from 'd3-geo';

export default function renderMap (toggleModal, stateColors) {
  return readJSON('https://d3js.org/us-10m.v1.json', (err, us) => {
    if (err) throw err;

    const node = this.node;
    const states = us.objects.states;
    const geoData = feature(us, states).features;
    const path = geoPath();
    const lines = path(mesh(us, states, (a, b) => (a !== b)));

    select(node)
      .append('g')
      .attr('class', 'states')
      .selectAll('path')
      .data(geoData)
      .enter()
      .append('path')
      .attr('d', path)
      .attr('id', data => 'state' + Number(data.id))
      .on('mouseover', data => {
        // This will hold a callback to render details on the 
        // selected state
      })
    //.on('click', data => toggleModal(data.id))
      .style('fill', data => stateColors[data.id] || 'black')

    select(node)
      .append('path')
      .attr('class', 'state-borders')
      .attr('p', lines);
  });
}
