import React, { Component } from 'react';
import { Button, Input } from 'semantic-ui-react';
import AddLink from './SankeyUtils/AddLink';
import AddNode from './SankeyUtils/AddNode';
import FooterBar from './SankeyUtils/FooterBar';
import PublishButton from './tools/PublishButton'

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
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <h2>Tools</h2>
        <div className="tools">
          <AddLink addLink={this.props.addLink} data={this.props.data} />
          <AddNode addNode={this.props.addNode} data={this.props.data} />
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
                <h4>Save Changes</h4>
                <Button
                  className="tool-button"
                  onClick={this.submitHeightWidth}
                >
                  Update chart size
                </Button>
              </div>
            </form>

            <hr />
            <div className="tool-item">
              <Button circular size="small" onClick={this.props.deleteChart}>
                Delete Chart
              </Button>
            </div>
            <div className="tool-item">
              <Button className="tool-button" onClick={this.props.handleUpdate}>
                Update Chart
              </Button>
            </div>
            <div className="tool-item">
              <Button className="tool-button" onClick={this.props.handleSubmit}>
                Save Changes as New Chart
              </Button>
              <PublishButton title='fake title' publish={this.props.publishTheChart} chartId={this.props.chartId}/>
            </div>
            <div className="tool-item">
              <FooterBar
                nodes={this.props.nodes}
                links={this.props.links}
                readFile={this.props.readFile}
                emptyDiagram={this.props.emptyDiagram}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SankeyTools;
