import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Input } from 'semantic-ui-react';
import { setHeightWidth } from '../../../../store/mapChart';

class ChartDimensions extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      heightInput: this.props.height + '',
      widthInput: this.props.width + ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    let { name, value } = evt.target;
    this.setState({ [name]: value });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    let { heightInput, widthInput } = this.state;
    let { submitHeightWidth } = this.props;

    submitHeightWidth(heightInput, widthInput);
  }

  render() {
    let {widthInput, heightInput } = this.state;
    return (
      <div>
        <h4>Edit Chart Dimensions</h4>
        <hr />
        <div className="form">
          <form onSubmit={this.handleSubmit}>
            <Input
              className="tool-item"
              onChange={this.handleChange}
              name="widthInput"
              label="Width"
              value={widthInput}
            />
            <Input
              className="tool-item"
              onChange={this.handleChange}
              name="heightInput"
              label="Height"
              value={heightInput}
            />
            <Button className="tool-item tool-button" onClick={this.handleSubmit}>
              Update chart size
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  let { height, width } = state.mapChart.data;
  return { height, width };
};

const mapDispatchToProps = dispatch => ({
  submitHeightWidth: (height, width) => {
    const action = setHeightWidth(height, width);
    dispatch(action);
  }
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ChartDimensions)
);
