import React from 'react';
import { Table } from 'semantic-ui-react';
import { Canvas } from '../../components';
import { Toolbar } from '../../components';

const Editor = () => (
  <div className="ui container">
    <div className="ui container">
      <Toolbar />
    </div>
    <div className="ui container">
      <Canvas />
    </div>
  </div>
);

export default Editor;
