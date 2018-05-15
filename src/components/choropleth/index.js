import React from 'react';
import renderMap from './renderMap';
import { mapWidth, mapHeight } from './constants';
import { default as Modal } from './modal';
import ColorPicker, { colorScale } from '../toolbars/tools/ColorPicker';

export default class Choropleth extends React.Component {
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

  componentDidMount() {
    this.renderMap(this.toggleModal, this.state.stateColors);
  }

  componentDidUpdate() {
    this.renderMap(this.toggleModal, this.state.stateColors);
  }

  selectedColor (hexcode) {
    colorScale('#ff1d1d', '#570e0e');
    colorScale('#ff1d1d', '#570e0e', 6);
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
    return (
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
              <ColorPicker handleColorChange={this.selectedColor}/>

              <input type="submit" value="Submit" />
            </form>
          </Modal>
        )}
        <div id="tooltip-container"></div>
      </div>
    );
  }
}
