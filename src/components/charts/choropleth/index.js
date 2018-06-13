import React from 'react';
import renderMap from './renderMap';
import MapChartTools from './MapChartTools';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateMapColors, fetchMapByIdThunk } from '../../../store/mapChart';
import { Table } from 'semantic-ui-react';
import ColorPickModal from './ColorPickModal';

class Choropleth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openModal: false,
      selectedStateId: ''
    };

    this.renderMap = renderMap.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal(stateId) {
    const selectedStateId = isNaN(Number(stateId)) ? '' : stateId;
    this.setState(prevState => ({
      openModal: !prevState.openModal,
      selectedStateId
    }));
  }

  componentDidMount() {
    const chartId = this.props.match.params.id;
    const { data, dispatchGetChartData } = this.props;
    const { stateColors } = this.props;

    if (chartId) dispatchGetChartData(chartId);

    this.renderMap(this.toggleModal, stateColors);
  }

  componentDidUpdate() {
    const { stateColors } = this.props;
    this.renderMap(this.toggleModal, stateColors);
  }

  render() {
    let { width, height, stateColors, chartId } = this.props;
    const { selectedStateId } = this.state;

    return (
      <Table>
        <Table.Row>
          <Table.Cell width="1">
            <MapChartTools
              stateColors={stateColors}
              renderMap={this.renderMap}
              chartId={chartId}
            />
          </Table.Cell>
          <Table.Cell>
            <div className="chartContainer">
              <svg
                id="choropleth"
                ref={node => { this.node = node; }}
                className="svg-container"
                width={width}
                height={height}
                style={{ marginTop: 20, marginLeft: 20 }}
              />
            </div>
          </Table.Cell>
        </Table.Row>
          {this.state.openModal && (
            <ColorPickModal
              targetId={selectedStateId}
              closeModal={this.toggleModal}
            />
          )}
      </Table>
    );
  }
}

const mapsStateToProps = state => {
  let { chartId, data, title, stateColors } = state.mapChart;
  return {
    chartId,
    data,
    uid: state.user.uid,
    title,
    height: data.height,
    width: data.width,
    stateColors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchColors: singleState => {
      const action = updateMapColors(singleState);
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
