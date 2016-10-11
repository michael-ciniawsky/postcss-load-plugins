// ------------------------------------
// #POSTCSS - LOAD PLUGINS - PLUGINS
// ------------------------------------

'use strict'

/**
 * @method plugins
 *
 * @param {Object} config PostCSS Config
 *
 * @return {Array} plugins PostCSS Plugins
 */
module.exports = function plugins (config) {
  let plugins = []

  if (Array.isArray(config.plugins)) {
    plugins = config.plugins

    plugins.forEach((plugin) => {
      if (typeof plugin !== 'function') {
        throw new TypeError(`
          ${plugin} must be a function, did you require() it ?
       `)
      }
    })

    return plugins
  } else {
    config = config.plugins

    const load = (plugin, options) => {
      if (options === null) {
        try {
          return require(plugin)
        } catch (err) {
          console.log(err)
        }
      } else {
        try {
          return require(plugin)(options)
        } catch (err) {
          console.log(err)
        }
      }
    }

    Object.keys(config)
      .filter((plugin) => config[plugin] !== false ? plugin : '')
      .forEach((plugin) => plugins.push(load(plugin, config[plugin])))

    return plugins
  }
}
