import React from 'react';
import { Table } from 'semantic-ui-react';
import Canvas from './Canvas';
import Toolbar from './Toolbar';

const Editor = () => (
  <Table className="editor">
    <Table.Body>
      <Table.Row>
        <h2>Tools</h2>
        <Toolbar />
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <Canvas />
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
);

export default Editor;
