import React from 'react';
import { ExportJSON, ImportJSON } from './utils';

export default class extends React.Component {
  render() {
    return (
      <div className="tools-footer">
        <div>
          <div>
          </div>
          <div>
            <button onClick={this.props.emptyDiagram}>New Diagram</button>
            <hr />
            <ExportJSON 
              nodes={this.props.nodes}
              links={this.props.links}
            />
            <hr />
            <ImportJSON readFile={this.props.readFile} />
            <div></div>
          </div>
        </div>
      </div>
    );
  }
};
