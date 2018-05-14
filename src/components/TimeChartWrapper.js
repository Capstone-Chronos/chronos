import { TimeChart } from '../components';
import React from 'react';

export default class TimeChartWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }


  render() {
    return (
      <div className='chartContainer'>
        <div className="tools" style={{ width: '15vw' }}>
        </div>
        <div style={{ width: '80vw', margin: '4em', alignContent: 'center' }}>
          <TimeChart />
        </div>
      </div>
    )
  }

}
