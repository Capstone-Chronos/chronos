import React from 'react';
import { ExportJSON, ImportJSON } from './utils';
import { Button } from 'semantic-ui-react';

export default class extends React.Component {
  render() {
    return (
      <div>
        <div className="tool-item">
          <ImportJSON
            readFile={this.props.readFile}
            uploadData={this.props.uploadData}
          />
        </div>
        <div className="tool-item">
          <ExportJSON nodes={this.props.nodes} links={this.props.links} />
        </div>

        <div className="tool-item">
          <Button
            className="ui tool-button fluid orange"
            onClick={this.props.emptyDiagram}
          >
            <i class="remove icon" />
            CLEAR DIAGRAM
          </Button>
        </div>
      </div>
    );
  }
}
