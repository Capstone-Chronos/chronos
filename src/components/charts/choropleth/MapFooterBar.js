import React from 'react';
import { connect } from 'react-redux';
import { importMapData } from '../../../store/mapChart';
import { ExportJSON } from '../../toolbars/SankeyUtils/utils';

const MapFooterBar = props => {
  return (
    <div>
      <div className="tool-item">
        <MapImportJSONContainer />
      </div>
      <div className="tool-item">
        <ExportJSON data={props.data} />
      </div>
      <div className="tool-item">
        <button
          type="button" className="ui button tool-button orange"
          onClick={props.emptyDiagram}
        >
          Clear Diagram
        </button>
      </div>
    </div>
  );
};

export default MapFooterBar;

class MapImportJSON extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filepath: ''
    };
    this.readFile = this.readFile.bind(this);
  }

  async readFile(e) {
    var file = e.target.files[0];
    let data;
    if (!file) {
      console.log('Failed to load file');
    } else if (!file.type.match('json.*')) {
      console.log(file.name + ' is not a valid json file.');
    } else {
      const reader = new FileReader();
      reader.onload = function(e) {
        let contents = JSON.parse(e.target.result);
        console.log(contents);
        data = contents.data;
        this.props.dispatchImportMapJSON(data);
      }.bind(this);
      reader.readAsText(file);
    }
  }

  render() {
    return (
      <div>
        <div className="ui button tool-button">
          <label
            htmlFor="file"
            className="ui icon button"
            onChange={this.readFile}
          >
            <i className="file icon" />
            Import JSON
          </label>
          <input
            type="file"
            id="file"
            style={{ display: 'none' }}
            onChange={this.readFile}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchImportMapJSON: data => {
      const action = importMapData(data);
      dispatch(action);
    }
  };
};

const MapImportJSONContainer = connect(() => ({}), mapDispatchToProps)(
  MapImportJSON
);
