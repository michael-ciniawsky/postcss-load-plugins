// ------------------------------------
// #POSTCSS - LOAD PlUGINS - TEST
// ------------------------------------

'use strict'

var test = require('ava')

var join = require('path').join
var read = require('fs').readFileSync

var fixture = function (file) {
  return read(join(__dirname, 'fixtures', file), 'utf8')
}
var expect = function (file) {
  return read(join(__dirname, 'expect', file), 'utf8')
}

var postcss = require('postcss')
var pluginsrc = require('../..')

test('postcss.config.js - {Function} - Load Plugins', function (t) {
  process.env.NODE_ENV = 'development'

  return pluginsrc().then(function (plugins) {
    t.is(plugins.length, 3)

    t.is(plugins[0], require('postcss-import'))
    t.is(plugins[1], require('postcss-nested'))
    t.is(plugins[2], require('postcss-sprites'))
  })
})

test('postcss.config.js - {Function} - Load Plugins', function (t) {
  process.env.NODE_ENV = 'production'

  return pluginsrc().then(function (plugins) {
    t.is(plugins.length, 4)

    t.is(plugins[0], require('postcss-import'))
    t.is(plugins[1], require('postcss-nested'))
    t.is(plugins[2], require('postcss-sprites'))
    t.is(plugins[3], require('cssnano'))
  })
})

test('postcss.config.js - {Function} - Process CSS', function (t) {
  process.env.NODE_ENV = 'development'

  return pluginsrc().then(function (plugins) {
    var options = {
      from: 'fixtures/index.css',
      to: 'expect/index.css'
    }

    return postcss(plugins)
      .process(fixture('index.css'), options)
      .then(function (result) {
        t.is(expect('index.css'), result.css)
      })
  })
})

test('postcss.config.js - {Function} - Process SSS', function (t) {
  process.env.NODE_ENV = 'development'

  return pluginsrc().then(function (plugins) {
    var options = {
      parser: require('sugarss'),
      from: 'fixtures/index.sss',
      to: 'expect/index.sss'
    }

    return postcss(plugins)
      .process(fixture('index.sss'), options)
      .then(function (result) {
        t.is(expect('index.sss'), result.css)
      })
  })
})
