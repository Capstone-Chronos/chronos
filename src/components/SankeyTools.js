import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import AddLink from './SankeyUtils/AddLink';
import AddNode from './SankeyUtils/AddNode';

class SankeyTools extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      height: this.props.height,
      width: this.props.width
    };
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitHeightWidth = this.submitHeightWidth.bind(this)
  }

  toggleVisibility = () => this.setState({ visible: !this.state.visible });

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
    console.log(this.state)
  }

  submitHeightWidth(evt) {
    evt.preventDefault();
    this.props.changeHeight(this.state.height);
    this.props.changeWidth(this.state.width);
    console.log(this.state)
  }

  render() {
    return (
      <div className="tools">
        <AddLink
          addLink={this.props.addLink}
          links={this.props.links}
          nodes={this.props.nodes}
        />
        <AddNode
          addNode={this.props.addNode}
          links={this.props.links}
          nodes={this.props.nodes}
        />
        <Button onClick={this.props.handleSubmit}>Save Changes</Button>
        <div>
          <form onSubmit={this.submitHeightWidth}>
            <label>Width</label>
            <input onChange={this.handleChange} name="width" defaultValue={this.props.width}></input>
            <label>Height</label>
            <input onChange={this.handleChange} name="height" defaultValue={this.props.height}></input>
            <Button onClick={this.submitHeightWidth}>Update chart size</Button>
          </form>
        </div>
      </div>
    );
  }
}

export default SankeyTools;
