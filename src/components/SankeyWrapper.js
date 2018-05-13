import React from 'react';
import { Sankey, SankeyTools, FooterBar, ColorPicker } from '../components';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { loadData, readFile } from './toolbars/SankeyUtils/utils';
import { loadDefaultData, clearData, saveChart } from '../store/sankeyChart';

class SankeyWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    };

    this.loadData = loadData.bind(this);
    this.readFile = readFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.emptyDiagram = this.emptyDiagram.bind(this);

    this.addNode = this.addNode.bind(this);
    this.updateNode = this.updateNode.bind(this);
    this.addLink = this.addLink.bind(this);
    this.updateLink = this.updateLink.bind(this);

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.closeAndSaveModal = this.closeAndSaveModal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.changeHeight = this.changeHeight.bind(this);
    this.changeWidth = this.changeWidth.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
  }

  componentWillMount() {
    this.setState({
      height: this.props.height,
      width: this.props.width
    });
  }

  handleSubmit() {
    let updateData = {
      nodes: this.state.nodes || this.props.nodes,
      links: this.state.links || this.props.links,
      width: this.state.width || this.props.width,
      height: this.state.height || this.props.height
    };
    this.props.saveChanges(updateData);
  }

  changeHeight(newHeight) {
    this.setState({ height: newHeight });
  }

  changeWidth(newWidth) {
    this.setState({ width: newWidth });
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

  updateNode(name, idx, color) {
    var nodes = this.props.nodes;
    nodes[idx].name = name;
    nodes[idx].color = color;
    this.setState({ nodes });
  }

  emptyDiagram() {
    this.props.clearChart();
  }

  addLink(source, target, value, color) {
    if (
      this.props.nodes.length > 1 &&
      !isNaN(value) &&
      !isNaN(source) &&
      !isNaN(target)
    ) {
      var links = this.props.links;
      var idx = links.length;

      links[idx] = { source, target, value, color };
      this.setState({ links });
    }
  }

  updateLink(source, target, value, color) {
    var links = this.props.links.map(link => {
      if (link.source === source && link.target === target) {
        link.value = value;
        link.color = color;
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
      var modalContentNodeColor = e.color;
    } else if (e.value !== undefined) {
      var modalContent = 'link';
      var modalContentLinkValue = e.value;
      var modalContentLinkSource = e.source.node;
      var modalContentLinkTarget = e.target.node;
      var modalContentLinkColor = e.target.color;
    }

    this.setState({
      modalIsOpen: true,
      modalContent,
      modalContentNodeId,
      modalContentNodeName,
      modalContentNodeColor,
      modalContentLinkValue,
      modalContentLinkSource,
      modalContentLinkTarget,
      modalContentLinkColor
    });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  closeAndSaveModal() {
    if (this.state.modalContent === 'link') {
      this.updateLink(
        this.state.modalContentLinkSource,
        this.state.modalContentLinkTarget,
        this.state.modalContentLinkValue,
        this.state.modalContentLinkColor
      );
    } else if (this.state.modalContent === 'node') {
      this.updateNode(
        this.state.modalContentNodeName,
        this.state.modalContentNodeId,
        this.state.modalContentNodeColor
      );
    }
    this.setState({ modalIsOpen: false });
  }

  handleColorChange(color) {
    if (this.state.modalContent === 'link') {
      this.setState({ modalContentLinkColor: color });
    } else if (this.state.modalContent === 'node') {
      this.setState({ modalContentNodeColor: color });
    }
  }

  handleInputChange(key) {
    if (this.state.modalContent === 'link') {
      this.setState({ modalContentLinkValue: key.target.value });
    } else if (this.state.modalContent === 'node') {
      this.setState({ modalContentNodeName: key.target.value });
    }
  }

  render() {
    if (this.state.modalContent === 'link') {
      var modalValue = this.state.modalContentLinkValue;
      var header = 'Update Link Weight';
      var color = 'Change Link Color';
    } else if (this.state.modalContent === 'node') {
      var modalValue = this.state.modalContentNodeName;
      var header = 'Update Node Name';
      var color = 'Change Node Color';
    }

    var modalStyle = {
      content: {
        top: '275px',
        left: '37%',
        right: 'auto',
        bottom: 'auto',
        border: '0px solid #333',
        width: '300px'
      },
      overlay: {
        backgroundColor: 'rgba(0, 0, 0 , 0.35)'
      }
    };

    return (
      <div>
        <div className="chartContainer">
          <SankeyTools
            nodes={this.props.nodes}
            links={this.props.links}
            addNode={this.addNode}
            addLink={this.addLink}
            openModal={this.openModal}
            handleSubmit={this.handleSubmit}
            changeHeight={this.changeHeight}
            changeWidth={this.changeWidth}
            currentHeight={this.state.height}
            currentWidth={this.state.width}
          />
          <Sankey
            nodes={this.props.nodes}
            links={this.props.links}
            openModal={this.openModal}
            height={this.state.height}
            width={this.state.width}
          />
        </div>
        <div>
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
            style={modalStyle}
          >
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
            <div style={{ marginTop: '2em', marginBottom: '2em' }}>
              <h4>{color}</h4>
              <ColorPicker handleColorChange={this.handleColorChange} />
            </div>
            <div className="row">
              <div className="col-xs-12">
                <button
                  className="btn btn-primary btn-block"
                  onClick={this.closeAndSaveModal}
                >
                  Apply Changes
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

const mapStateToProps = storeState => {
  return {
    nodes: storeState.sankeyChart.nodes,
    links: storeState.sankeyChart.links,
    height: storeState.sankeyChart.height,
    width: storeState.sankeyChart.width
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    fetchDefaultData: () => {
      const action = loadDefaultData();
      dispatch(action);
    },
    clearChart: () => {
      const action = clearData();
      dispatch(action);
    },
    saveChanges: stateObj => {
      const action = saveChart(stateObj);
      dispatch(action);
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SankeyWrapper);
