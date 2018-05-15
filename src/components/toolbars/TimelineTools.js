import React, { Component } from 'react';
import { Button, Input, Checkbox } from 'semantic-ui-react';

class TimelineTools extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      height: this.props.height,
      width: this.props.width
    };
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitHeightWidth = this.submitHeightWidth.bind(this);
  }

  toggleVisibility = () => this.setState({ visible: !this.state.visible });

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
    console.log(this.state);
  }

  submitHeightWidth(evt) {
    evt.preventDefault();
    this.props.changeHeight(this.state.height);
    this.props.changeWidth(this.state.width);
  }

  render() {
    return (
      <div>
        <h2>Tools</h2>
        <label>
          Edit 
          </label>
        <Checkbox onChange={this.props.toggleEditor} toggle label="Present" />
        <div className="tools">
          <h4>New Event</h4>
          <hr />
          <div className='tool-item'>
            <Input
              onChange={this.handleChange}
              name="name"
              label="Name"
            />
          </div>
          <div className='tool-item'>
            <Input
              onChange={this.handleChange}
              name='year'
              label='Year'
            />
          </div>
          <div className='tool-item'>
            <Input
              onChange={this.handleChange}
              name='day'
              label='Day'
            />
          </div>
          <div className='tool-item'>
            <Input
              onChange={this.handleChange}
              name='month'
              label='Month'
            />
          </div>
          <h4>Edit Chart Dimensions</h4>
          <div className="form">
            <form onSubmit={this.submitHeightWidth}>
              <div className="tool-item">
                <Input
                  onChange={this.handleChange}
                  name="width"
                  label="Width"
                  defaultValue={this.props.width}
                />
              </div>
              <div className="tool-item">
                <Input
                  onChange={this.handleChange}
                  name="height"
                  label="Height"
                  defaultValue={this.props.height}
                />
              </div>
              <div className="tool-item">
                <Button
                  className="tool-button"
                  onClick={this.submitHeightWidth}
                >
                  Update chart size
                </Button>
              </div>
            </form>
            <h4>Edit Start and End Date</h4><hr />
            <div className="form">
              <form onSubmit={this.submitHeightWidth}>
                <div className="tool-item">
                  <Input
                    onChange={this.handleChange}
                    name="start"
                    label="Start"
                    defaultValue={this.props.width}
                  />
                </div>
                <div className="tool-item">
                  <Input
                    onChange={this.handleChange}
                    name="end"
                    label="End"
                    defaultValue={this.props.height}
                  />
                </div>
                <div className="tool-item">
                  <Button
                    className="tool-button"
                    onClick={this.submitHeightWidth}
                  >
                    Update date range
                </Button>
                </div>
              </form>
              {/* <h4>Save Changes</h4>
            <hr />
            <div className="tool-item">
              <Button className="tool-button" onClick={this.props.handleUpdate}>
                Update Chart
              </Button>
            </div>
            <div className="tool-item">
              <Button className="tool-button" onClick={this.props.handleSubmit}>
                Save Changes as New Chart
              </Button>
            </div>
            <div className="tool-item">
              <FooterBar
                nodes={this.props.nodes}
                links={this.props.links}
                readFile={this.props.readFile}
                emptyDiagram={this.props.emptyDiagram}
              />
            </div>
            <div className="tool-item">
              <Button className='tool-button' color='red' onClick={this.props.deleteChart}>
                Delete Chart
              </Button>
            </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TimelineTools;