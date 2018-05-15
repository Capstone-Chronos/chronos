import React from 'react';
import { ExportJSON, ImportJSON } from './utils';

export default class extends React.Component {
  render() {
    return (
      <div>
        <button className='ui button tool-button' onClick={this.props.emptyDiagram}>New Diagram</button>
        <hr />
        <ExportJSON
          nodes={this.props.nodes}
          links={this.props.links}
        />
        <hr />
        <ImportJSON readFile={this.props.readFile} />
      </div>
    );
  }
};
