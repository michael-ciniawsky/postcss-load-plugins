// ------------------------------------
// #POSTCSS - LOAD PLUGINS - LIB
// ------------------------------------

'use strict'

var path = require('path')

module.exports = function loadPlugins (config, options) {
  if (typeof options === 'string') {
    options = require(path.join(process.cwd(), options))
  }

  if (options) {
    options = Object.assign({}, config.plugins, options.plugins)
  } else {
    options = config.plugins
  }

  function load (plugin, options) {
    return options === false ? require(plugin) : require(plugin)(options)
  }

  var plugins = []

  Object.keys(options).forEach(function (plugin) {
    plugins.push(load(plugin, options[plugin]))
  })

  return plugins
}
