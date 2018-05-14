import React from 'react';
import renderMap from './renderMap';
import { mapWidth, mapHeight } from './constants';
import { default as Modal } from './modal';

export default class Choropleth extends React.Component {
  constructor(props) {
    super(props);
    this.renderMap = renderMap.bind(this);

    this.state = {
      openModal: true
    }
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal(data) {
    this.setState(prevState => ({openModal: !prevState.openModal}));
  }

  componentDidMount() {
    this.renderMap(this.toggleModal);
  }

  componentDidUpdate() {
    this.renderMap(this.toggleModal);
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
            <h4>Title</h4>
          </Modal>
        )}
      </div>
    );
  }
}
