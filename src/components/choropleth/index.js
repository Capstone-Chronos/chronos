import React from 'react';
import renderMap from './renderMap';
import MapChartTools from '../toolbars/MapChartTools';
import { mapWidth, mapHeight } from './constants';
import { default as Modal } from './modal';
import ColorPicker from '../toolbars/tools/ColorPicker';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateMapColors, fetchMapByIdThunk } from '../../store/mapChart';

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

  // componentWillReceiveProps() {
  //   console.log('helloooo', this.props)
  //   this.setState({
  //     stateColors: this.props,
  //     data: this.props.data
  //   })
  // }

  componentDidMount() {
    const chartId = this.props.match.params.id;
    if (chartId) this.props.dispatchGetChartData(chartId);
    if (this.props.data) {
      if (this.props.data.stateColors) {
        this.renderMap(this.toggleModal, this.props.data.stateColors);
      }
    }
    // this.renderMap(this.toggleModal, this.props.data.stateColors);
    // this.renderMap(this.toggleModal, this.state.stateColors);
  }

  componentDidUpdate() {
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
    console.log('MAP RERENDER', this.props.data.stateColors);
    return (
      <div>
        <div>
          <MapChartTools
            stateColors={this.props.data.stateColors}
            renderMap={this.renderMap}
            chartId={this.props.chartId}
          />
        </div>
        <div className="chartContainer">
          <svg
            id="choropleth"
            ref={node => {
              this.node = node;
            }}
            className="svg-container"
            width={mapWidth}
            height={mapHeight}
            style={{ marginTop: 20, marginLeft: 20 }}
          />
          {this.state.openModal && (
            <Modal toggleModal={this.toggleModal}>
              <form onSubmit={this.handleSubmit}>
                <h4>{this.state.selectedStateId}</h4>
                <ColorPicker handleColorChange={this.selectedColor} />

                <input type="submit" value="Submit" />
              </form>
            </Modal>
          )}
          <div id="tooltip-container" />
        </div>
      </div>
    );
  }
}

const mapsStateToProps = state => {
  return {
    chartId: state.mapChart.chartId,
    data: state.mapChart.data,
    uid: state.user.uid,
    title: state.mapChart.title
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
