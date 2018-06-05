import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Input } from 'semantic-ui-react';
import { setHeight, setWidth } from '../../../../store/mapChart';

class ChartDimensions extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      heightInput: '',
      widthInput: ''
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
    this.props.submitHeightWidth(heightInput, widthInput);
  }

  render() {
    let { handleChange, handleSubmit } = this;
    let { width, height } = this.props;
    console.log(this.state);
    return (
      <div>
        <h4>Edit Chart Dimensions</h4>
        <hr />
        <div className="form">
          <form onSubmit={handleSubmit}>
            <Input
              className="tool-item"
              onChange={handleChange}
              name="widthInput"
              label="Width"
              defaultValue={width}
            />
            <Input
              className="tool-item"
              onChange={handleChange}
              name="heightInput"
              label="Height"
              defaultValue={height}
            />
            <Button className="tool-item tool-button" onClick={handleSubmit}>
              Update chart size
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  height: state.mapChart.data.height,
  width: state.mapChart.data.width
});

const mapDispatchToProps = dispatch => ({
  submitHeightWidth: (height, width) => {
    if (height !== '' && !isNaN(height)) dispatch(setHeight(height));
    if (width !== '' && !isNaN(width)) dispatch(setWidth(width));
  }
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ChartDimensions)
);
