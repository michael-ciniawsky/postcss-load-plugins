// ------------------------------------
// #POSTCSS - LOAD PLUGINS
// ------------------------------------

'use strict'

const config = require('cosmiconfig')

const loadPlugins = require('./lib/loadPlugins')

module.exports = function (options) {
  return config('postcss')
    .catch((error) => console.log(error))
    .then((result) => loadPlugins(result.config, options))
}
