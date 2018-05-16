import React from 'react';
import { Sankey, SankeyTools, FooterBar, ColorPicker } from '../components';
import history from '../routes/history';
import Modal from 'react-modal';
import addNode from './toolbars/SankeyUtils/AddNode';
import addLink from './toolbars/SankeyUtils/AddLink';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { loadData, readFile } from './toolbars/SankeyUtils/utils';
import {
  loadDefaultData,
  clearData,
  importData,
  saveSankeyChartThunk,
  updateTitle
} from '../store/sankeyChart';
import {
  deleteChart,
  updateChart,
  fetchChartById,
  publishChart
} from '../database/sankeyChart';

class SankeyWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      titleIsSet: false

    };

    this.loadData = loadData.bind(this);
    this.readFile = readFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.delete = this.delete.bind(this);
    this.publishTheChart = this.publishTheChart.bind(this);
    this.setTitle = this.setTitle.bind(this);

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

  componentDidMount() {
    fetchChartById(this.props.chartId);
  }

  componentWillMount() {
    this.setState({
      height: this.props.height || 800,
      width: this.props.width || 1000
    });
  }

  handleSubmit() {
    let savedData = {
      name: this.props.title,
      data: this.state.data || this.props.data,
      userId: this.props.userId,
      width: this.state.width || this.props.width,
      height: this.state.height || this.props.height
    };
    this.props.saveChanges(this.props.data, this.props.title);
  }

  publishTheChart() {
    let { chartId } = this.props;
    publishChart(chartId);
  }

  handleUpdate() {
    let { data, chartId } = this.props;
    updateChart(data, chartId);
  }

  delete() {
    let chartId = this.props.match.params.id;
    let userId = this.props.userId;
    deleteChart(chartId, userId);
  }

  changeHeight(newHeight) {
    this.setState({ height: newHeight });
  }

  changeWidth(newWidth) {
    this.setState({ width: newWidth });
  }

  addNode(name) {
    var nodes = this.props.data.nodes;
    var idx = nodes.length;
    name = name || 'Node' + idx;
    nodes[idx] = {
      node: idx,
      name
    };

    this.setState({ nodes });
  }

  updateNode(name, idx, color) {
    var nodes = this.props.data.nodes;
    nodes[idx].name = name;
    nodes[idx].color = color;
    this.setState({ nodes });
  }

  emptyDiagram() {
    this.props.clearChart();
  }

  addLink(source, target, value, color) {
    if (
      this.props.data.nodes.length > 1 &&
      !isNaN(value) &&
      !isNaN(source) &&
      !isNaN(target)
    ) {
      var links = this.props.data.links;
      var idx = links.length;

      links[idx] = { source, target, value, color };
      this.setState({ links });
    }
  }

  updateLink(source, target, value, color) {
    var links = this.props.data.links.map(link => {
      if (link.source === source && link.target === target) {
        link.value = value;
        link.color = color;
      }
      return link;
    });

    this.setState({ links });
  }

  setTitle(evt) {
    evt.preventDefault();
    console.log(evt.target.title.value)
    this.props.updateTheTitle(evt.target.title.value)
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

    return !this.props.data ? (
      <div />
    ) : (
      <div>
        <div className="chartContainer">
          <div>
            <SankeyTools
              data={this.props.data}
              addNode={this.addNode}
              addLink={this.addLink}
              openModal={this.openModal}
              handleSubmit={this.handleSubmit}
              handleUpdate={this.handleUpdate}
              changeHeight={this.changeHeight}
              changeWidth={this.changeWidth}
              height={this.state.height}
              width={this.state.width}
              readFile={this.readFile}
              emptyDiagram={this.emptyDiagram}
              deleteChart={this.delete}
              publishTheChart={this.publishTheChart}
              chartId={this.props.chartId}
            />
          </div>
          <div>

            <h2>{this.props.title}</h2>
            <form
            onSubmit={this.setTitle}
            >
              <input
                type="text"
                name="title"
                placeholder="Change Title Here"
                value={this.state.title}
              />
              <input type="submit" value="Update Title"/>
            </form>
            <Sankey
              data={this.props.data}
              openModal={this.openModal}
              height={this.state.height}
              width={this.state.width}
            />
          </div>
        </div>
        <div>
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

const userId = firebase.auth().currentUser;

const mapStateToProps = storeState => {
  return {
    data: storeState.sankeyChart.data,
    height: storeState.sankeyChart.height,
    width: storeState.sankeyChart.width,
    userId: storeState.user.id,
    chartId: storeState.sankeyChart.chartId,
    title: storeState.sankeyChart.title
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
    saveChanges: (data, title) => {
      const action = saveSankeyChartThunk(data, title);
      dispatch(action);
    },
    uploadData: data => {
      const action = importData(data);
      dispatch(action);
    },
    updateTheTitle: title => {
      const action = updateTitle(title)
      dispatch(action)
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SankeyWrapper);
