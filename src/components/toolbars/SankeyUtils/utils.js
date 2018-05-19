import React from 'react';
import request from 'superagent';
import { Button } from 'semantic-ui-react';

class ExportJSON extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { nodes, links, data } = this.props;
    var diagramData = { nodes, links, data };
    var downloadData =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(diagramData));

    return (
      <Button
        className="ui button tool-button fluid"
        href={downloadData}
        download="data.json"
        name="submit"
        onClick={this.submitEvent}
      >
        <i className="folder open icon" />
        EXPORT JSON
      </Button>
    );
  }
}

class ImportJSON extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Button className="ui button tool-button fluid">
        <i className="file icon" />
        <input type="file" onInput={this.props.readFile} />
        IMPORT JSON
      </Button>
      // <label className="ui icon button tool-button fluid">
      //   <input type="file" onInput={this.props.readFile} />
      //   <i className="file icon" />
      //   IMPORT JSON
      // </label>
    );
  }
}

function loadData(path) {
  request.get(path).end((err, res) => {
    if (err) {
      console.log(err);
    }

    var links = res.body.links;
    var nodes = res.body.nodes.map((node, i) => {
      if (!node.node) {
        node.node = i;
      }
      return node;
    });
    let data = {
      nodes: nodes,
      links: links
    };
    this.props.uploadData({ data });
  });
}

function readFile(e) {
  var file = e.target.files[0];

  if (!file) {
    console.log('Failed to load file');
  } else if (!file.type.match('json.*')) {
    console.log(file.name + ' is not a valid json file.');
  } else {
    var r = new FileReader();
    r.onload = function(e) {
      var contents = JSON.parse(e.target.result);
      var nodes = contents.nodes.map(function(node, i) {
        if (!node.node) {
          node.node = i;
        }
        return node;
      });
      var links = contents.links;
      this.props.uploadData({
        nodes: nodes,
        links: links
      });
    }.bind(this);
    r.readAsText(file);
  }
}

export { ExportJSON, ImportJSON, loadData, readFile };
