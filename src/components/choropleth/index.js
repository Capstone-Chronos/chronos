import React from 'react';
import renderMap, { toggleColor } from './renderMap';
import { mapWidth, mapHeight } from './constants';
import { default as Modal } from './modal';

export default class Choropleth extends React.Component {
  constructor(props) {
    super(props);
    this.renderMap = renderMap.bind(this);

    this.state = {
      openModal: false,
      selectedStateId: -1
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal(stateId) {
    let selectedStateId = Number(stateId);
    selectedStateId = Number.isNaN(selectedStateId) ? -1 : selectedStateId;

    this.setState(prevState => ({
      openModal: !prevState.openModal,
      selectedStateId
    }));
  }

  componentDidMount() {
    this.renderMap(this.toggleModal);
  }

  componentDidUpdate() {
    this.renderMap(this.toggleModal);
  }

  handleSubmit(e) {
    e.preventDefault();
    toggleColor(this.state.selectedStateId, 'red');
    this.toggleModal();
  }

  render() {
    console.log('Rendering choropleth of the US states....');

    return (
      <div className="chartContainer">
        <svg
          id="choropleth"
          ref={node => { this.node = node; }}
          width={mapWidth}
          height={mapHeight}
          style={{ marginTop: 20, marginLeft: 20 }}
        />
        {this.state.openModal && (
          <Modal wrapper={this} toggleModal={this.toggleModal}>
            <form onSubmit={this.handleSubmit}>
              <h4>{this.state.selectedStateId}</h4>
              <input type="submit" value="Submit" />
            </form>
          </Modal>
        )}
      </div>
    );
  }
}
