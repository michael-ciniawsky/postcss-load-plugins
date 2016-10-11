// ------------------------------------
// #POSTCSS - LOAD PLUGINS - INDEX
// ------------------------------------

'use strict'

const config = require('cosmiconfig')

const loadPlugins = require('./lib/plugins')

/**
 * @author Michael Ciniawsky (@michael-ciniawsky) <michael.ciniawsky@gmail.com>
 * @description Autoload Plugins for PostCSS
 *
 * @module postcss-load-plugins
 * @version 1.0.0
 *
 * @requires cosmiconfig
 * @requires ./lib/plugins.js
 *
 * @method pluginsrc
 *
 * @param  {Object} ctx Context
 * @param  {String} path Directory
 * @param  {Object} options Options
 *
 * @return {Array} config PostCSS Plugins
 */
module.exports = function pluginsrc (ctx, path, options) {
  const defaults = {
    cwd: process.cwd(),
    env: process.env.NODE_ENV
  }

  ctx = Object.assign(defaults, ctx) || defaults
  path = path || process.cwd()
  options = options || {}

  return config('postcss', options)
    .load(path)
    .then((result) => {
      result = result.config || {}

      return result
    })
    .then((plugins) => {
      if (typeof plugins === 'function') {
        plugins = plugins(ctx)
      }
      if (typeof result === 'object') {
        plugins = Object.assign(plugins, ctx)
      }

      return loadPlugins(plugins)
    })
    .catch((err) => {
      console.log(err)
    })
}
