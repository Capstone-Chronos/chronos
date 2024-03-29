import React from 'react';
import { connect } from 'react-redux';
import {Button} from 'semantic-ui-react';
import PublishButton from '../../../toolbars/tools/PublishButton';
import MapFooterBar from '../MapFooterBar';
import { saveExistingChart, publishChart } from '../../../../database/charts';
import { clearMapData } from '../../../../store/mapChart';

const FileOptions = props => {
  let {
    handleSubmit,
    publishTheChart,
    chartId,
    data,
    importMapDataFromFile,
    emptyDiagram,
    deleteChart,
    clearChart
  } = props;

  return (
    <div>
      <h4>Save Changes</h4>
      <hr />
      <Button
        className="tool-item tool-button"
        onClick={() => saveExistingChart(data, chartId)}
      >
        Update Chart
      </Button>
      <Button className="tool-item tool-button" onClick={handleSubmit}>
        Save Changes as New Chart
      </Button>
      <PublishButton
        className="tool-item"
        title="fake title"
        publish={publishTheChart}
        chartId={chartId}
      />
      <MapFooterBar
        className="tool-item"
        data={data}
        readFile={importMapDataFromFile}
        emptyDiagram={emptyDiagram}
      />

      <Button
        className="tool-item ui button tool-button orange"
        onClick={clearChart}
      >
        Clear Diagram
      </Button>

      <Button
        className="tool-item tool-button"
        color="red"
        onClick={deleteChart}>
        Delete Chart
      </Button>
    </div>
  );
};

const mapStateToProps = state => ({
  data: state.mapChart.data,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  clearChart: () => {
    const action = clearMapData();
    dispatch(action);
  },
  publishTheChart: chartId => {
    const action = publishChart(chartId);
    dispatch(action);
  },
  ...ownProps
});

export default connect(mapStateToProps, mapDispatchToProps)(FileOptions);
