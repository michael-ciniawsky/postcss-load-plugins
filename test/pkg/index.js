// ------------------------------------
// #POSTCSS - LOAD PlUGINS - PKG - TEST
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

test('package.json - {Object} - Load Plugins', function (t) {
  return pluginsrc().then(function (plugins) {
    t.is(plugins.length, 3)

    t.is(plugins[0], require('postcss-import'))
    t.is(plugins[1], require('postcss-nested'))
    t.is(plugins[2], require('postcss-sprites'))
  })
})

test('package.json - {Object} - Process CSS', function (t) {
  return pluginsrc().then(function (plugins) {
    var options = { from: 'fixtures/index.css', to: 'expect/index.css' }

    return postcss(plugins)
      .process(fixture('index.css'), options)
      .then(function (result) {
        t.is(expect('index.css'), result.css)
      })
  })
})

test('package.json - {Object} - Process SSS', function (t) {
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
