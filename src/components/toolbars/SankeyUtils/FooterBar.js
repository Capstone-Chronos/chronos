import React from 'react';
import { ExportJSON, ImportJSON } from './utils';

export default class extends React.Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <div className="tool-item">
          <ImportJSON readFile={this.props.readFile} uploadData={this.props.uploadData} />
        </div>
        <div className="tool-item">
          <ExportJSON nodes={this.props.nodes} links={this.props.links} />
        </div>
        <div className="tool-item">
          <button
            className="ui button tool-button orange"
            onClick={this.props.emptyDiagram}
          >
            Clear Diagram
          </button>
        </div>
      </div>
    );
  }
}
