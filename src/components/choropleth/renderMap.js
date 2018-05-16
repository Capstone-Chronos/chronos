import { select, event } from 'd3-selection';
import { json as readJSON } from 'd3';
import { mesh, feature } from 'topojson';
import { geoPath } from 'd3-geo';

const hoverWizard = data => {
  let [x, y] = [event.layerX, event.layerY];
};

export default function renderMap (toggleModal, stateColors) {
  const geoFileUrl = 'https://d3js.org/us-10m.v1.json';

  return readJSON(geoFileUrl, (err, us) => {
    if (err) throw err;

    const node = this.node;
    const states = us.objects.states;
    const geoData = feature(us, states).features;
    const path = geoPath();
    const lines = path(mesh(us, states, (a, b) => (a !== b)));
    let tooltip = document.getElementById('tooltip-container');

    select(node)
      .append('g')
      .attr('class', 'states')
      .selectAll('path')
      .data(geoData)
      .enter()
      .append('path')
      .attr('d', path)
      .attr('id', data => 'state' + Number(data.id))
      .on('mousemove', data => hoverWizard(data))
      .on('click', data => toggleModal(data.id))
      .style('fill', function (data) {
        return stateColors[data.id] || '#939393';
      });

    select(node)
      .append('path')
      .attr('class', 'state-borders')
      .attr('p', lines);
  });
}
