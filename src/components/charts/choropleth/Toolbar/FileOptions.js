import React from 'react';
import {Button} from 'semantic-ui-react';
import PublishButton from '../../../toolbars/tools/PublishButton';
import MapFooterBar from '../MapFooterBar';

const FileOptions = props => {
  let {
    handleUpdate,
    handleSubmit,
    publishTheChart,
    chartId,
    data,
    importMapDataFromFile,
    emptyDiagram,
    deleteChart,
  } = props;

  return (
    <div>
      <h4>Save Changes</h4>
      <hr />
        <Button className="tool-item tool-button" onClick={handleUpdate}>
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
        className="tool-item tool-button"
        color="red"
        onClick={deleteChart}>
        Delete Chart
      </Button>
    </div>
  );
};

const mapStateToProps = state => ({
  chartId: state.mapChart.chartId,
  title: state.mapChart.title,
  height: state.mapChart.height,
  width: state.mapChart.width,
  data: state.mapChart.data
});

export default FileOptions;
