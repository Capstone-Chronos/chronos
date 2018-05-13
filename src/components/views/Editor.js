import React from 'react';
import { Table } from 'semantic-ui-react';
import { Canvas } from '../../components';
import { Toolbar } from '../../components';

const Editor = () => (
  <Table className="editor">
    <Table.Body>
      <Table.Row>
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
