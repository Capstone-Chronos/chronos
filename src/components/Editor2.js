import React from 'react';
import Canvas from './Canvas';
import Toolbar from './Toolbar';

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
