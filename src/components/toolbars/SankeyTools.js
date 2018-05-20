import React, { Component } from 'react';
import { Button, Input, Checkbox } from 'semantic-ui-react';
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
  }

  submitHeightWidth(evt) {
    evt.preventDefault();
    this.props.changeHeight(this.state.height);
    this.props.changeWidth(this.state.width);
  }

  render() {
    let editorMode = this.props.editorMode

    return (
      <div className="toolbar">
        <h2>Tools</h2>
        <div className="toggleContainer">
          <div>
            <label>EDIT</label>
          </div>
          <div>
            <Checkbox
              onChange={this.props.toggleEditor}
              toggle
              label="PRESENT"
            />
          </div>
        </div>
        {editorMode ?
          <div className="tools">
            <h4>New Link</h4>
            <hr />
            <div className='tool-item'>
              <AddLink addLink={this.props.addLink} data={this.props.data} />
            </div>
            <h4>New Node</h4>
            <hr />
            <div className='tool-item'>
              <AddNode addNode={this.props.addNode} data={this.props.data} />
            </div>
            <h4>Edit Chart Dimensions</h4><hr />
            <div className="form">
              <form onSubmit={this.submitHeightWidth}>
                <div className="tool-item">
                  <Input
                    fluid
                    onChange={this.handleChange}
                    name="width"
                    label="Width"
                    defaultValue={this.props.width}
                  />
                </div>
                <div className="tool-item">
                  <Input
                    fluid
                    onChange={this.handleChange}
                    name="height"
                    label="Height"
                    defaultValue={this.props.height}
                  />
                </div>
                <div className="tool-item">
                  <Button
                    fluid
                    onClick={this.submitHeightWidth}
                  >
                    Update chart size
                </Button>
                </div>
              </form>
              <h4>Save Changes</h4>
              <hr />
              <div className="tool-item">
                <Button fluid onClick={this.props.handleUpdate}>
                  Update Chart
              </Button>
              </div>
              <div className="tool-item">
                <Button className="tool-button" fluid onClick={this.props.handleSubmit}>
                  Save Changes as New Chart
              </Button>
                <PublishButton title='fake title' publish={this.props.publishTheChart} chartId={this.props.chartId} />
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
                <Button className='tool-button' fluid color='red' onClick={this.props.deleteChart}>
                  Delete Chart
              </Button>
              </div>
            </div>
          </div>
          :
          ""
        }
      </div>
    );
  }
}

export default SankeyTools;
