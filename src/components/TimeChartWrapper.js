import { TimeChart } from '../components';
import React from 'react';
import { Button, Grid } from 'semantic-ui-react';

export default class TimeChartWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  openInfo() {
    
  }


  render() {
    return (
      <div className='chartContainer'>
        <Grid>
          <Grid.Row>
            <Grid.Column width="3">
              <div className="tools" style={{margin: '3em'}}>
                <Button>Click me!</Button>
              </div>
            </Grid.Column>
            <Grid.Column width="13">
              <div style={{ margin: '4em' }}>
                <TimeChart />
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }

}
