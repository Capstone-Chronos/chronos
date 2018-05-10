import React from 'react';
import store, { addDataPoint } from '../store';

class BarChartTools extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addNodeVal: ''
    };
    this.addDataPoint = this.addDataPoint.bind(this);
    this.updateLocalNodeVal = this.updateLocalNodeVal.bind(this);
  }

  componentDidMount() {
    // this.props.fetchAllTimelines();
  }

  // Add Data Point functions

  addDataPoint(evt) {
    evt.preventDefault();
    store.dispatch(addDataPoint(this.state.addNodeVal));
    console.log('submitted');
    console.log(this.state);
  }

  updateLocalNodeVal(evt) {
    evt.preventDefault();
    this.setState({ addNodeVal: evt.target.value });
  }

  render() {
    return (
      <div>
        <div className="updateForm">
          <form onSubmit={this.addDataPoint}>
            <input label="data" onChange={this.updateLocalNodeVal} />
            <button type="submit" value="Submit">
              Submit
            </button>
          </form>
        </div>;
      </div>
    );
  }
}

export default BarChartTools;
