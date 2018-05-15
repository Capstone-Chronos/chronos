import React from 'react';
import { Button, Input } from 'semantic-ui-react';

export default class extends React.Component {
  constructor() {
    super();

    this.state = {
      name: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps, 'nextprops');
    if (nextProps.data) {
      this.setState({
        name: 'Node' + nextProps.data.nodes.length
      });
    }
  }

  handleChange(key) {
    return e => {
      var state = {};
      state[key] = e.target.value;
      this.setState(state);
    };
  }

  render() {
    var defaultValue = this.state.name;

    return (
      <div>
        <div className='tool-item'>
          <Input
            className="form-control"
            label="Name"
            value={defaultValue}
            onChange={this.handleChange('name')}
          />
        </div>
        <span>
          <div className='tool-item'>
            <Button
              className='tool-button primary'
              onClick={this.props.addNode.bind(null, this.state.name)}
            >
              Add Node
          </Button>
          </div>
        </span>
      </div>
    );
  }
}
