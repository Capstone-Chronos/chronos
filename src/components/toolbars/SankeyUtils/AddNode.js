import React from 'react';

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
      <div className="input-group">
        <input
          className="form-control"
          value={defaultValue}
          onChange={this.handleChange('name')}
        />
        <span className="input-group-btn">
          <button
            className="btn btn-primary"
            onClick={this.props.addNode.bind(null, this.state.name)}
          >
            Add Node
          </button>
        </span>
      </div>
    );
  }
}
