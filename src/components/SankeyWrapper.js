import React from 'react';
import Sankey from './Sankey';
import SankeyTools from './SankeyTools';
import Modal from 'react-modal';
import addNode from './SankeyUtils/AddNode';
import addLink from './SankeyUtils/AddLink';
import FooterBar from './SankeyUtils/FooterBar';
import { connect } from "react-redux";
import { ExportJSON, ImportJSON, loadData, readFile } from './SankeyUtils/utils';
import { loadDefaultData } from '../store/sankeyChart';

let empty = {
  nodes: [
    {
      node: 0,
      name: 'Node0'
    },
    {
      node: 1,
      name: 'Node1'
    }
  ],
  links: [
    {
      source: 0,
      target: 1,
      value: 100
    }
  ]
}

class SankeyWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    };

    this.loadData = loadData.bind(this);
    this.readFile = readFile.bind(this);

    this.emptyDiagram = this.emptyDiagram.bind(this);

    this.addNode = this.addNode.bind(this);
    this.updateNode = this.updateNode.bind(this);
    this.addLink = this.addLink.bind(this);
    this.updateLink = this.updateLink.bind(this);

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.closeAndSaveModal = this.closeAndSaveModal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchDefaultData()
  }

  addNode(name) {
    var nodes = this.props.nodes;
    var idx = nodes.length;
    name = name || 'Node' + idx;
    nodes[idx] = {
      node: idx,
      name
    };

    this.setState({ nodes });
  }

  updateNode(name, idx) {
    var nodes = this.props.nodes;
    nodes[idx].name = name;

    this.setState({ nodes });
  }

  emptyDiagram() {
    // this.loadData('./SankeyUtils/emptyData.json');
    this.setState(empty);
  }


  addLink(source, target, value) {
    if (this.props.nodes.length > 1 && !isNaN(value) && !isNaN(source) && !isNaN(target)) {

      var links = this.props.links;
      var idx = links.length;

      links[idx] = { source, target, value };
      this.setState({ links });
    }
  }


  updateLink(source, target, value) {
    var links = this.props.links.map((link) => {
      if (link.source === source && link.target === target) {
        link.value = value;
      }
      return link;
    });

    this.setState({ links });
  }


  openModal(e) {
    if (e.node !== undefined) {
      var modalContent = 'node';
      var modalContentNodeId = e.node;
      var modalContentNodeName = e.name;
    } else if (e.value !== undefined) {
      var modalContent = 'link';
      var modalContentLinkValue = e.value;
      var modalContentLinkSource = e.source.node;
      var modalContentLinkTarget = e.target.node;
    }

    this.setState({
      modalIsOpen: true,
      modalContent,
      modalContentNodeId,
      modalContentNodeName,
      modalContentLinkValue,
      modalContentLinkSource,
      modalContentLinkTarget
    });
  }


  closeModal() {
    this.setState({ modalIsOpen: false });
  }


  closeAndSaveModal() {
    if (this.state.modalContent === 'link') {
      this.updateLink(this.state.modalContentLinkSource, this.state.modalContentLinkTarget, this.state.modalContentLinkValue);
    } else if (this.state.modalContent === 'node') {
      this.updateNode(this.state.modalContentNodeName, this.state.modalContentNodeId);
    }
    this.setState({ modalIsOpen: false });
  }


  handleInputChange(key) {
    if (this.state.modalContent === 'link') {
      this.setState({ modalContentLinkValue: key.target.value });
    } else if (this.state.modalContent === 'node') {
      this.setState({ modalContentNodeName: key.target.value });
    }
  }


  render() {
    console.log(this.state)
    console.log("Props", this.props)
    if (this.state.modalContent === 'link') {
      var modalValue = this.state.modalContentLinkValue;
      var header = 'Update Link Weight';
    } else if (this.state.modalContent === 'node') {
      var modalValue = this.state.modalContentNodeName;
      var header = 'Update Node Name';
    }

    var modalStyle = {
      content: {
        top: '275px',
        left: '37%',
        right: 'auto',
        bottom: 'auto',
        border: '0px solid #333',
        width: '300px',
      },
      overlay: {
        backgroundColor: 'rgba(0, 0, 0 , 0.35)'
      }
    };

    return (<div>
      <SankeyTools nodes={this.props.nodes} links={this.props.links} addNode={this.addNode} addLink={this.addLink} openModal={this.openModal} />
      <Sankey nodes={this.props.nodes} links={this.props.links} openModal={this.openModal} />
      <FooterBar
        nodes={this.props.nodes}
        links={this.props.links}
        readFile={this.readFile}
        emptyDiagram={this.emptyDiagram}
      />
      <Modal
        closeTimeoutMS={150}
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.handleModalCloseRequest}
        style={modalStyle}>
        <button className="close" onClick={this.closeModal}>
          <span aria-hidden="true">&times;</span>
        </button>
        <h4>{header}</h4>
        <hr />
        <input
          className="form-control"
          defaultValue={modalValue}
          onChange={this.handleInputChange}
        />
        <hr />
        <div className="row">
          <div className="col-xs-12">
            <button className="btn btn-primary btn-block" onClick={this.closeAndSaveModal}>Apply Changes</button>
          </div>
        </div>
      </Modal>
    </div>
    );
  }
}

const mapStateToProps = (storeState) => {
  return {
    nodes: storeState.SankeyChart.nodes,
    links: storeState.SankeyChart.links
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    fetchDefaultData: () => {
      const action = loadDefaultData();
      dispatch(action);
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SankeyWrapper)