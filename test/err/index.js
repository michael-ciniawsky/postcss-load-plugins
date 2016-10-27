// ------------------------------------
// #POSTCSS - LOAD PLUGINS - TEST - ERR
// ------------------------------------

'use strict'

var test = require('ava')

var pluginsrc = require('../..')

test('No Config - Load defaults', function (t) {
  return pluginsrc({}, '../').then(function (plugins) {
    t.deepEqual(plugins, [])

    t.is(plugins.length, 0)
  })
})
