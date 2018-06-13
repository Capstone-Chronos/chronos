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
import ColorPickModal from './ColorPickModal';

class Choropleth extends React.Component {
  constructor(props) {
    super(props);
    this.renderMap = renderMap.bind(this);

    this.state = {
      openModal: false,
      selectedStateId: '',
      stateColors: {},
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal(stateId) {
    console.log('state id:', stateId);
    let selectedStateId = isNaN(Number(stateId))
      ? ''
      : stateId;

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

  render() {
    let { width, height } = this.props;
    const { selectedStateId } = this.state;
    const { toggleModal } = this;

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
                width={width}
                height={height}
                style={{ marginTop: 20, marginLeft: 20 }}
              />
            </div>
          </Table.Cell>
        </Table.Row>
          {this.state.openModal && (
            <ColorPickModal
              stateId={selectedStateId}
              closeModal={toggleModal}
            />
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
