import React from 'react';
import renderMap from './renderMap';
import MapChartTools from '../toolbars/MapChartTools';
import { mapWidth, mapHeight } from './constants';
import { default as Modal } from './modal';
import ColorPicker from '../toolbars/tools/ColorPicker';
import { fetchMapChartById } from '../../database/mapChart'
import {connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

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
      ? '' : selectedStateId;

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
    fetchMapChartById(chartId) 
    this.renderMap(this.toggleModal, this.state.stateColors);
    // this.renderMap(this.toggleModal, this.state.stateColors);
  }

  componentDidUpdate() {
    this.renderMap(this.toggleModal, this.state.stateColors);
  }

  selectedColor (hexcode) {
    this.setState({selectedColor: hexcode});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState(prevState => {
      let stateColors = {...prevState.stateColors};
      stateColors[prevState.selectedStateId] = prevState.selectedColor;
      return {stateColors, selectedColor: ''};
    });
    this.toggleModal();
  }

  render() {
    console.log(this.state.stateColors);
    return (
      <div>
        <div>
          <MapChartTools stateColors={this.state.stateColors} renderMap={this.renderMap}/>
        </div>
        <div className="chartContainer">
          <svg
            id="choropleth"
            ref={node => { this.node = node; }}
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
    title: state.mapChart.title,
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default withRouter(connect(mapsStateToProps, mapDispatchToProps)(Choropleth))