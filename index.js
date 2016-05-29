// ------------------------------------
// #POSTCSS - LOAD PLUGINS
// ------------------------------------

'use strict'

const path = require('path')
const config = require('cosmiconfig')

module.exports = function (options) {
  function loadPlugins (config) {
    if (typeof options === 'string') {
      options = require(path.join(process.cwd(), options)).plugins
    }

    if (typeof options === 'object') {
      for (let option in options) {
        config.plugins[option] = options[option]
      }
    }

    options = config.plugins

    function Plugin (plugin, options) {
      if (options === null || options === undefined) {
        return require(plugin)()
      }
      return require(plugin)(options)
    }

    let plugins = []

    Object.keys(options).forEach((plugin) => {
      console.log(plugin)
      plugins.push(Plugin(plugin, options[plugin]))
    })

    return plugins
  }

  return config('postcss')
    .catch((error) => console.log(error))
    .then((result) => loadPlugins(result.config))
    .then((plugins) => console.log(plugins))
}
