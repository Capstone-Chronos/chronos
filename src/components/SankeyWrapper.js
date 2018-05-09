import React from 'react';
import Sankey from './Sankey';
import SankeyTools from './SankeyTools';
import Modal from 'react-modal';
import addNode from './SankeyUtils/AddNode';
import addLink from './SankeyUtils/AddLink';


let testData = {
  nodes: [{ "name": "Agricultural 'waste'" },
    { "name": "Bio-conversion" },
    { "name": "Liquid" },
    { "name": "Losses" },
    { "name": "Solid" },
    { "name": "Gas" },
    { "name": "Biofuel imports" },
    { "name": "Biomass imports" },
    { "name": "Coal imports" },
    { "name": "Coal" },
    { "name": "Coal reserves" },
    { "name": "District heating" },
    { "name": "Industry" },
    { "name": "Heating and cooling - commercial" },
    { "name": "Heating and cooling - homes" },
    { "name": "Electricity grid" },
    { "name": "Over generation / exports" },
    { "name": "H2 conversion" },
    { "name": "Road transport" },
    { "name": "Agriculture" },
    { "name": "Rail transport" },
    { "name": "Lighting & appliances - commercial" },
    { "name": "Lighting & appliances - homes" },
    { "name": "Gas imports" },
    { "name": "Ngas" },
    { "name": "Gas reserves" },
    { "name": "Thermal generation" },
    { "name": "Geothermal" },
    { "name": "H2" },
    { "name": "Hydro" },
    { "name": "International shipping" },
    { "name": "Domestic aviation" },
    { "name": "International aviation" },
    { "name": "National navigation" },
    { "name": "Marine algae" },
    { "name": "Nuclear" },
    { "name": "Oil imports" },
    { "name": "Oil" },
    { "name": "Oil reserves" },
    { "name": "Other waste" },
    { "name": "Pumped heat" },
    { "name": "Solar PV" },
    { "name": "Solar Thermal" },
    { "name": "Solar" },
    { "name": "Tidal" },
    { "name": "UK land based bioenergy" },
    { "name": "Wave" },
    { "name": "Wind" }
  ],
  links: [{ "source": 0, "target": 1, "value": 124 },
    { "source": 1, "target": 2, "value": 1 },
    { "source": 1, "target": 3, "value": 26 },
    { "source": 1, "target": 4, "value": 280 },
    { "source": 1, "target": 5, "value": 81.144 },
    { "source": 6, "target": 2, "value": 35 },
    { "source": 7, "target": 4, "value": 35 },
    { "source": 8, "target": 9, "value": 11.606 },
    { "source": 10, "target": 9, "value": 63.965 },
    { "source": 9, "target": 4, "value": 75.571 },
    { "source": 11, "target": 12, "value": 10.639 },
    { "source": 11, "target": 13, "value": 22.505 },
    { "source": 11, "target": 14, "value": 46.184 },
    { "source": 15, "target": 16, "value": 104.453 },
    { "source": 15, "target": 14, "value": 113.726 },
    { "source": 15, "target": 17, "value": 27.14 },
    { "source": 15, "target": 12, "value": 342.165 },
    { "source": 15, "target": 18, "value": 37.797 },
    { "source": 15, "target": 19, "value": 4.412 },
    { "source": 15, "target": 13, "value": 40.858 },
    { "source": 15, "target": 3, "value": 56.691 },
    { "source": 15, "target": 20, "value": 7.863 },
    { "source": 15, "target": 21, "value": 90.008 },
    { "source": 15, "target": 22, "value": 93.494 },
    { "source": 23, "target": 24, "value": 40.719 },
    { "source": 25, "target": 24, "value": 82.233 },
    { "source": 5, "target": 13, "value": 0.129 },
    { "source": 5, "target": 3, "value": 1.401 },
    { "source": 5, "target": 26, "value": 151.891 },
    { "source": 5, "target": 19, "value": 2.096 },
    { "source": 5, "target": 12, "value": 48.58 },
    { "source": 27, "target": 15, "value": 7.013 },
    { "source": 17, "target": 28, "value": 20.897 },
    { "source": 17, "target": 3, "value": 6.242 },
    { "source": 28, "target": 18, "value": 20.897 },
    { "source": 29, "target": 15, "value": 6.995 },
    { "source": 2, "target": 12, "value": 121.066 },
    { "source": 2, "target": 30, "value": 128.69 },
    { "source": 2, "target": 18, "value": 135.835 },
    { "source": 2, "target": 31, "value": 14.458 },
    { "source": 2, "target": 32, "value": 206.267 },
    { "source": 2, "target": 19, "value": 3.64 },
    { "source": 2, "target": 33, "value": 33.218 },
    { "source": 2, "target": 20, "value": 4.413 },
    { "source": 34, "target": 1, "value": 4.375 },
    { "source": 24, "target": 5, "value": 122.952 },
    { "source": 35, "target": 26, "value": 839.978 },
    { "source": 36, "target": 37, "value": 504.287 },
    { "source": 38, "target": 37, "value": 107.703 },
    { "source": 37, "target": 2, "value": 611.99 },
    { "source": 39, "target": 4, "value": 56.587 },
    { "source": 39, "target": 1, "value": 77.81 },
    { "source": 40, "target": 14, "value": 193.026 },
    { "source": 40, "target": 13, "value": 70.672 },
    { "source": 41, "target": 15, "value": 59.901 },
    { "source": 42, "target": 14, "value": 19.263 },
    { "source": 43, "target": 42, "value": 19.263 },
    { "source": 43, "target": 41, "value": 59.901 },
    { "source": 4, "target": 19, "value": 0.882 },
    { "source": 4, "target": 26, "value": 400.12 },
    { "source": 4, "target": 12, "value": 46.477 },
    { "source": 26, "target": 15, "value": 525.531 },
    { "source": 26, "target": 3, "value": 787.129 },
    { "source": 26, "target": 11, "value": 79.329 },
    { "source": 44, "target": 15, "value": 9.452 },
    { "source": 45, "target": 1, "value": 182.01 },
    { "source": 46, "target": 15, "value": 19.013 },
    { "source": 47, "target": 15, "value": 289.366 }
  ]
}

export default class SankeyWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nodes: testData.nodes,
      links: testData.links,
      modalIsOpen: false
    }
    this.addNode = this.addNode.bind(this);
    this.updateNode = this.updateNode.bind(this);
    this.addLink = this.addLink.bind(this);
    this.updateLink = this.updateLink.bind(this);

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.closeAndSaveModal = this.closeAndSaveModal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  addNode(name) {
    var nodes = this.state.nodes;
    var idx = nodes.length;
    name = name || 'Node' + idx
    nodes[idx] = {
      node: idx,
      name
    };

    this.setState({ nodes });
  }

  updateNode(name, idx) {
    var nodes = this.state.nodes;
    nodes[idx]['name'] = name;

    this.setState({ nodes });
  }


  addLink(source, target, value) {
    if (this.state.nodes.length > 1 && !isNaN(value) && !isNaN(source) && !isNaN(target)) {

      var links = this.state.links;
      var idx = links.length;

      links[idx] = { source, target, value };
      this.setState({ links });
    }
  }


  updateLink(source, target, value) {
    var links = this.state.links.map((link) => {
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
    return (
      <div>
      <SankeyTools nodes={this.state.nodes} links={this.state.links} addNode={this.addNode} addLink={this.addLink} openModal={this.openModal} />
      <Sankey nodes={this.state.nodes} links={this.state.links} openModal={this.openModal}/>
      <Modal
        closeTimeoutMS={150}
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.handleModalCloseRequest}
        <button className="close" onClick={this.closeModal}>
          <span aria-hidden="true">&times;</span>
        </button>
        <hr />
        <input
          className="form-control"
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
    )
  }
}
// style={modalStyle}>

// <h4>{header}</h4>

// defaultValue={modalValue}   

