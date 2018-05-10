import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Sidebar, Segment, Button, Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import AddLink from './SankeyUtils/AddLink';
import AddNode from './SankeyUtils/AddNode';


class SankeyTools extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    };
    this.toggleVisibility.bind(this);
  }

  toggleVisibility = () => this.setState({ visible: !this.state.visible });

  render() {

    return (
      <div className="tools">
          <AddLink addLink={this.props.addLink} links={this.props.links} nodes={this.props.nodes}/>
          <AddNode addNode={this.props.addNode} links={this.props.links} nodes={this.props.nodes}/>
      </div>
    );
  }
}

export default SankeyTools;