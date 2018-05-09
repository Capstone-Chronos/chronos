import React from 'react';

const Toolbar = props => {
  let { tools } = props;
  console.log;
  let key = 1;
  return tools.map(tool => (
    <button key={key++} onClick={tool.clickHandler}>
      {tool.name}
    </button>
  ));
};

export default Toolbar;
