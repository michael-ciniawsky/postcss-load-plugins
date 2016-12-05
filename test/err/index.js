// ------------------------------------
// #POSTCSS - LOAD PLUGINS - TEST - ERR
// ------------------------------------

'use strict'

var test = require('ava')

var path = require('path')

var pluginsrc = require('../..')

test('No Config', function (t) {
  return pluginsrc().then(function (config) {
    t.is(config.file, '')

    t.is(config.plugins.length, 0)
    t.deepEqual(config.plugins, [])
  })
})

test('Invalid Config', function (t) {
  return pluginsrc({}, 'test/err/').then(function (config) {
    t.is(config.file, path.resolve('test/err/postcss.config.js'))

    t.is(config.plugins.length, 0)
    t.deepEqual(config.plugins, [])
  })
})
