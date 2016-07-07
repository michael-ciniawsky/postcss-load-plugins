// ------------------------------------
// #POSTCSS - LOAD PLUGINS
// ------------------------------------

'use strict'

var config = require('cosmiconfig')

var loadPlugins = require('./lib/loadPlugins')

module.exports = function (options) {
  return config('postcss')
    .catch(function (error) {
      console.log(error)
    })
    .then(function (result) {
      return loadPlugins(result.config, options)
    })
}
