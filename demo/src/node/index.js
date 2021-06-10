const path = require('path');

// transpile imports on the fly
// eslint-disable-next-line import/no-extraneous-dependencies
require('@babel/register')({
  configFile: path.resolve(__dirname, './babel.config.js')
});

// eslint-disable-next-line import/no-dynamic-require
require(path.resolve(__dirname, './nodetest.js'));
