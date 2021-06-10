import React from 'react';
import ReactDOMServer from 'react-dom/server';
import SimpleCircularOrLinearView from '../SimpleCircularOrLinearView';

const createSimpleCircularOrLinearView = props => {
  return ReactDOMServer.renderToString(<SimpleCircularOrLinearView {...props} />);
};

export default createSimpleCircularOrLinearView;
window.createSimpleCircularOrLinearView = createSimpleCircularOrLinearView;
