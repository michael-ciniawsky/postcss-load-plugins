// ------------------------------------
// #POSTCSS - LOAD PlUGINS - TEST
// ------------------------------------

'use strict'

var test = require('ava')

var path = require('path')

var read = require('fs').readFileSync

var postcss = require('postcss')
var pluginsrc = require('../../..')

var fixture = function (file) {
  return read(path.join(__dirname, 'fixtures', file), 'utf8')
}

var expect = function (file) {
  return read(path.join(__dirname, 'expect', file), 'utf8')
}

test('postcss.config.js - {Function} - Load Plugins', function (t) {
  return pluginsrc({}, 'test/js/array/').then(function (config) {
    var plugins = config.plugins

    t.is(plugins.length, 4)
    t.is(plugins[0].postcssPlugin, 'postcss-import')
    t.is(plugins[1].postcss.postcssPlugin, 'postcss-nested')
    t.is(plugins[2].postcssPlugin, 'postcss-sprites')
    t.is(plugins[3].postcssPlugin, 'postcss-cssnext')

    t.is(config.file, path.resolve('test/js/array/postcss.config.js'))
  })
})

test('postcss.config.js - {Function} - Load Plugins', function (t) {
  process.env.NODE_ENV = 'production'

  return pluginsrc({}, 'test/js/array/').then(function (config) {
    var plugins = config.plugins

    t.is(plugins.length, 5)
    t.is(plugins[0].postcssPlugin, 'postcss-import')
    t.is(plugins[1].postcss.postcssPlugin, 'postcss-nested')
    t.is(plugins[2].postcssPlugin, 'postcss-sprites')
    t.is(plugins[3].postcssPlugin, 'postcss-cssnext')
    t.is(plugins[4].postcssPlugin, 'cssnano')

    t.is(config.file, path.resolve('test/js/array/postcss.config.js'))
  })
})

test('postcss.config.js - {Function} - Process CSS', function (t) {
  return pluginsrc({}, 'test/js/array/').then(function (config) {
    var plugins = config.plugins

    var options = {
      from: 'test/js/array/fixtures/index.css',
      to: 'test/js/array/expect/index.css'
    }

    return postcss(plugins)
      .process(fixture('index.css'), options)
      .then(function (result) {
        t.is(expect('index.css'), result.css)
      })
  })
})

test('postcss.config.js - {Function} - Process SSS', function (t) {
  return pluginsrc({}, 'test/js/array/').then(function (config) {
    var plugins = config.plugins

    var options = {
      parser: require('sugarss'),
      from: 'test/js/array/fixtures/index.sss',
      to: 'test/js/array/expect/index.sss'
    }

    return postcss(plugins)
      .process(fixture('index.sss'), options)
      .then(function (result) {
        t.is(expect('index.sss'), result.css)
      })
  })
})
