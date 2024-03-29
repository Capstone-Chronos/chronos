import React from 'react';
// import request from 'superagent';
import store, { setBarData } from '../../../store';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

export default class BarChartJSONUtil extends React.Component {
  render() {
    return (
      <div className="bar-json-util">
        <Button onClick={() => store.dispatch(setBarData([]))}>
          RESET CHART{' '}
        </Button>
        <BarExportJSONContainer />
        <BarImportJSON />
      </div>
    );
  }
}

class BarExportJSON extends React.Component {
  render() {
    let diagramData = this.props.data;
    let data =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(diagramData));
    return (
      <Button href={data} download="data.json">
        Export JSON
      </Button>
    );
  }
}

const mapStateToProps = state => ({
  data: state.barChart.data
});

const BarExportJSONContainer = connect(mapStateToProps)(BarExportJSON);

class BarImportJSON extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filepath: ''
    };
    this.readFile = this.readFile.bind(this);
  }

  readFile(e) {
    var file = e.target.files[0];

    if (!file) {
      console.log('Failed to load file');
    } else if (!file.type.match('json.*')) {
      console.log(file.name + ' is not a valid json file.');
    } else {
      const reader = new FileReader();
      reader.onload = function(e) {
        var contents = JSON.parse(e.target.result);
        var data = contents.data;
        store.dispatch(setBarData(data));
      };
      reader.readAsText(file);
    }
  }

  render() {
    return (
      <div>
        <div>
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

export { BarChartJSONUtil };
