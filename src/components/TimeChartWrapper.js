import { TimeChart } from '../components';
import React from 'react';
import { Button, Grid } from 'semantic-ui-react';

export default class TimeChartWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorMode: true
    }
    this.toggleEditor = this.toggleEditor.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  //Function to open info pane in presentation mode or editing modal in editor mode
  handleClick(e) {
    if (!this.state.editorMode) {
      console.log(e)
    }
  }

  toggleEditor() {
    this.setState({ editorMode: !this.state.editorMode })
  }


  render() {
    return (
      <div className='chartContainer'>
        <Grid>
          <Grid.Row>
            <Grid.Column width="3">
              <div className="tools" style={{ margin: '3em' }}>
                <Button onClick={this.toggleEditor}>{this.state.editorMode ? 'Presentation Mode' : 'Editor Mode'}</Button>
              </div>
            </Grid.Column>
            <Grid.Column width="13">
              <div style={{ margin: '4em' }}>
                <TimeChart handleClick={this.handleClick} />
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }

}
