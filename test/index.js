// ------------------------------------
// #POSTCSS - LOAD PlUGINS - TEST
// ------------------------------------

'use strict'

var test = require('ava')

var fs = require('fs')
var path = require('path')

function fixtures (file) {
  return fs.readFileSync(path.join(__dirname, 'fixtures', file), 'utf8')
}

function expected (file) {
  return fs.readFileSync(path.join(__dirname, 'expects', file), 'utf8')
}

var postcss = require('postcss')
var pluginsrc = require('..')

test('1 - Load with default plugins ', function (t) {
  return pluginsrc().then(function (plugins) {
    t.is(plugins.length, 3)
    t.is(plugins[0].postcssPlugin, 'postcss-import')
    t.is(plugins[1].postcssPlugin, 'postcss-nested')
    t.is(plugins[2].postcssPlugin, 'postcss-bem')
  })
})

test('2 - Load with custom plugins ', function (t) {
  return pluginsrc('postcss.config.js').then(function (plugins) {
    t.is(plugins.length, 3)
    t.is(plugins[0].postcssPlugin, 'postcss-import')
    t.is(plugins[1].postcssPlugin, 'postcss-nested')
    t.is(plugins[2].postcssPlugin, 'postcss-bem')
  })
})

test('3 - Process CSS with default plugins', function (t) {
  return pluginsrc().then(function (plugins) {
    return postcss(plugins)
      .process(fixtures('index.css'))
      .then(function (result) {
        t.is(expected('index.css'), result.css)
      })
  })
})

test('4 - Process SSS with custom plugins', (t) => {
  return pluginsrc('postcss.config.js').then((plugins) => {
    return postcss(plugins)
      .process(fixtures('index.css'))
      .then(function (result) {
        t.is(expected('custom.css'), result.css)
      })
  })
})

test('5 - Process SSS with default plugins', function (t) {
  return pluginsrc().then(function (plugins) {
    return postcss(plugins)
      .process(fixtures('index.sss'), {parser: require('sugarss')})
      .then(function (result) {
        t.is(expected('index.sss.css'), result.css)
      })
  })
})

test('6 - Process SSS with custom plugins', function (t) {
  return pluginsrc('postcssrc.json').then(function (plugins) {
    return postcss(plugins)
      .process(fixtures('index.sss'), {parser: require('sugarss')})
      .then(function (result) {
        t.is(expected('custom.sss.css'), result.css)
      })
  })
})
