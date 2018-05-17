import React from 'react';
import { ExportJSON, ImportJSON } from '../toolbars/SankeyUtils/utils';

export default class MapFooterBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div className="tool-item">
          <ImportJSON readFile={this.props.readFile} />
        </div>
        <div className="tool-item">
          <ExportJSON data={this.props.data} />
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
