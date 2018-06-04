import React from 'react';
import { Button, Input } from 'semantic-ui-react';

const ChartDimensions = props => {
  let { submitHeightWidth, handleChange, width, height } = props;
  return (
    <div>
      <h4>Edit Chart Dimensions</h4>
      <hr />
      <div className="form">
        <form onSubmit={submitHeightWidth}>
          <Input
            className="tool-item"
            onChange={handleChange}
            name="width"
            label="Width"
            defaultValue={width}
          />
          <Input
            className="tool-item"
            onChange={handleChange}
            name="height"
            label="Height"
            defaultValue={height}
          />
          <Button className="tool-item tool-button" onClick={submitHeightWidth}>
            Update chart size
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChartDimensions;
