import React from 'react';
import request from 'superagent';

class ExportJSON extends React.Component {
  render() {
    var diagramData = {};
    diagramData.nodes = this.props.nodes;
    diagramData.links = this.props.links;
    var data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(diagramData));

    return (
      <a className="ui button tool-button" href={data} download="data.json">Export JSON</a>
    );
  }
};


class ImportJSON extends React.Component {
  render() {
    return (
      <div className='ui labeled input'>
        <div className="ui label label">Import JSON</div>
        <input type="file" onChange={this.props.readFile} />
      </div>
    );
  }
};


function loadData(path) {
  request
    .get(path)
    .end((err, res) => {
      if (err) { console.log(err); }

      var links = res.body.links;
      var nodes = res.body.nodes.map((node, i) => {
        if (!node.node) { node.node = i; }
        return node
      });

      this.setState({ nodes, links });
    });
}


function readFile(e) {
  var file = e.target.files[0];

  if (!file) {
    console.log("Failed to load file");
  } else if (!file.type.match('json.*')) {
    console.log(file.name + " is not a valid json file.");
  } else {
    var r = new FileReader();
    r.onload = function (e) {
      var contents = JSON.parse(e.target.result);
      var nodes = contents.nodes.map(function (node, i) {
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

export { ExportJSON, ImportJSON, loadData, readFile }