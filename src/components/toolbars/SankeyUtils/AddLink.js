import React from 'react';
import { Button, Input } from 'semantic-ui-react';

export default class extends React.Component {
  constructor() {
    super();

    this.state = {
      source: NaN,
      target: NaN,
      weight: 'Weight'
    };

    this.handleChange = this.handleChange.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.setDefault = this.setDefault.bind(this);
  }

  handleChange(key) {
    return e => {
      var state = {};
      state[key] = parseInt(e.target.value);
      this.setState(state);
    };
  }

  clearInput() {
    this.setState({ weight: '' });
  }

  setDefault() {
    if (typeof this.state.weight !== 'number') {
      this.setState({ weight: 'Weight' });
    }
  }

  render() {
    if (this.props.data){
      let { nodes, links } = this.props.data
      var sourceNodes = nodes.map((node, i) => {
        return (
          <option value={node.node} key={i}>
            {node.name}
          </option>
        );
      });
  
      sourceNodes.unshift(
        <option value={NaN} key="000">
          {'Select Source'}
        </option>
      );
  
      var targetNodes = nodes
        .filter((node, i) => {
          return node.node !== this.state.source;
        })
        .map((node, i) => {
          return (
            <option value={node.node} key={i}>
              {node.name}
            </option>
          );
        });
  
      targetNodes.unshift(
        <option value={NaN.toString()} key="000">
          {'Select Target'}
        </option>
      );
    }

    return (
      <div>
        <div className='tool-item'>
          <select
            onChange={this.handleChange('source')}
          >
            {sourceNodes}
          </select>
        </div>
        <div className='tool-item'>
          <select
            onChange={this.handleChange('target')}
          >
            {targetNodes}
          </select>
        </div>
        <div className='tool-item'>
          <Input
            label="Name"
            value={this.state.weight}
            onFocus={this.clearInput}
            onBlur={this.setDefault}
            onChange={this.handleChange('weight')}
          />
        </div>
        <div className='tool-item'>
          <Button
            className='tool-button primary'
            onClick={this.props.addLink.bind(
              null,
              parseInt(this.state.source),
              parseInt(this.state.target),
              parseInt(this.state.weight)
            )}
          >
            Add Link
          </Button>
        </div>
      </div>
    );
  }
}
