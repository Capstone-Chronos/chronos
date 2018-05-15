import React from 'react';
import { ExportJSON, ImportJSON } from './utils';

export default class extends React.Component {
  render() {
    return (
      <div>
        <div>
          <button className='ui button tool-button red' onClick={this.props.emptyDiagram}>New Diagram</button>
        </div>
        <div className='tool-item'>
          <ExportJSON
            nodes={this.props.nodes}
            links={this.props.links}
          />
        </div>
        <div className='tool-item'>
          <ImportJSON readFile={this.props.readFile} />
        </div>
      </div>
    );
  }
};
