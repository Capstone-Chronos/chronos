// import React from 'react';
// import store, { addDataPoint } from '../store';
// import { Button } from 'semantic-ui-react';
// import { BarChartJSONUtil } from './BarChartUtils/BarChartJSONUtil';

// class BarChartTools extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       addNodeVal: ''
//     };
//     this.addDataPoint = this.addDataPoint.bind(this);
//     this.updateLocalNodeVal = this.updateLocalNodeVal.bind(this);
//   }

//   componentDidMount() {}

//   // Add Data Point functions

//   addDataPoint(evt) {
//     evt.preventDefault();
//     store.dispatch(addDataPoint(this.state.addNodeVal));
//     console.log('submitted');
//     console.log(this.state);
//   }

//   updateLocalNodeVal(evt) {
//     evt.preventDefault();
//     this.setState({ addNodeVal: evt.target.value });
//   }

//   handleSave() {
//     // Send data to Firebase
//     // Update Saved state
//   }

//   render() {
//     return (
//       <div className="bar-toolbar">
//         <BarChartJSONUtil />
//         <Button onClick={this.props.handleSubmit}>SAVE</Button>
//         <div className="updateForm">
//           <form onSubmit={this.addDataPoint}>
//             <input label="data" onChange={this.updateLocalNodeVal} />
//             <Button type="submit" value="Submit">
//               ADD
//             </Button>
//           </form>
//         </div>
//       </div>
//     );
//   }
// }

// export default BarChartTools;
