import React from 'react';
import renderMap from './renderMap';
import MapChartTools from './MapChartTools';
import { defaultWidth, defaultHeight } from './constants';
import { default as Modal } from './modal';
import ColorPicker from '../../toolbars/tools/ColorPicker';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateMapColors, fetchMapByIdThunk } from '../../../store/mapChart';
import { Table } from 'semantic-ui-react';

class Choropleth extends React.Component {
  constructor(props) {
    super(props);
    this.renderMap = renderMap.bind(this);

    this.state = {
      openModal: false,
      selectedStateId: '',
      stateColors: {},
      selectedColor: ''
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectedColor = this.selectedColor.bind(this);
  }

  toggleModal(stateId) {
    let selectedStateId = stateId;
    selectedStateId = Number.isNaN(Number(selectedStateId))
      ? ''
      : selectedStateId;

    this.setState(prevState => ({
      openModal: !prevState.openModal,
      selectedStateId
    }));
  }

  componentDidMount() {
    const chartId = this.props.match.params.id;
    if (chartId) this.props.dispatchGetChartData(chartId);
    if (this.props.data) {
      if (this.props.data.stateColors) {
        this.renderMap(this.toggleModal, this.props.data.stateColors);
      }
    }
  }

  componentDidUpdate() {
    this.props.data &&
      this.renderMap(this.toggleModal, this.props.data.stateColors);
  }

  selectedColor(hexcode) {
    this.setState({ selectedColor: hexcode });
  }

  handleSubmit(event) {
    event.preventDefault();
    let stateId = this.state.selectedStateId;
    let color = this.state.selectedColor;
    this.props.dispatchColors({ [stateId]: color });
    this.toggleModal();
  }

  render() {
    let mapWidth = this.props.width || defaultWidth;
    let mapHeight = this.props.height || defaultHeight;

    return (
      <Table>
        <Table.Row>
          <Table.Cell width="1">
            <MapChartTools
              stateColors={this.props.data.stateColors}
              renderMap={this.renderMap}
              chartId={this.props.chartId}
            />
          </Table.Cell>
          <Table.Cell>
            <div className="chartContainer">
              <svg
                id="choropleth"
                ref={node => { this.node = node; }}
                className="svg-container"
                width={mapWidth}
                height={mapHeight}
                style={{ marginTop: 20, marginLeft: 20 }}
              />
            </div>
          </Table.Cell>
        </Table.Row>
          {this.state.openModal && (
            <Modal toggleModal={this.toggleModal}>
              <form onSubmit={this.handleSubmit}>
                <h4>{this.state.selectedStateId}</h4>
                <ColorPicker handleColorChange={this.selectedColor} />
                <input type="submit" value="Submit" />
              </form>
            </Modal>
          )}
      </Table>
    );
  }
}

const mapsStateToProps = state => {
  return {
    chartId: state.mapChart.chartId,
    data: state.mapChart.data,
    uid: state.user.uid,
    title: state.mapChart.title,
    height: state.mapChart.data.height,
    width: state.mapChart.data.width
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchColors: singleState => {
      const action = updateMapColors(singleState);
      console.log(singleState);
      dispatch(action);
    },
    dispatchGetChartData: chartId => {
      const action = fetchMapByIdThunk(chartId);
      dispatch(action);
    }
  };
};

export default withRouter(
  connect(mapsStateToProps, mapDispatchToProps)(Choropleth)
);
