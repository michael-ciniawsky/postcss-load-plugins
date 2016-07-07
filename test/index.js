// ------------------------------------
// #POSTCSS - LOAD PlUGINS - TEST
// ------------------------------------

'use strict'

var test = require('ava')

var fs = require('fs')
var path = require('path')

function fixtures (file) {
  return fs.readFileSync(path.join(__dirname, 'fixtures', file))
}

function expected (file) {
  return fs.readFileSync(path.join(__dirname, 'expects', file))
}

var postcss = require('postcss')
var pluginsrc = require('..')

test('1 - Load with default plugins ', function (t) {
  pluginsrc().then(function (plugins) {
    t.is(expected('plugins.default.js'), plugins)
  })
})

test('2 - Load with custom plugins ', function (t) {
  pluginsrc('postcss.config.js').then(function (plugins) {
    t.is(expected('plugins.custom.js'), plugins)
  })
})

test('3 - Process CSS with default plugins', function (t) {
  pluginsrc().then(function (plugins) {
    postcss(plugins)
      .process(fixtures('index.css'))
      .then(function (result) {
        console.log(result.css)
        fs.writeFileSync('expects/index.css', result.css)
        t.is(expected('index.css'), result.css)
      })
  })
})

test('4 - Process SSS with custom plugins', (t) => {
  pluginsrc('postcss.config.js').then((plugins) => {
    postcss(plugins)
      .process(fixtures('index.css'))
      .then(function (result) {
        console.log(result.css)
        fs.writeFileSync('expects/custom.css', result.css)
        t.is(expected('custom.css'), result.css)
      })
  })
})

test('5 - Process SSS with default plugins', function (t) {
  pluginsrc().then(function (plugins) {
    postcss(plugins)
      .process(fixtures('index.sss'), {parser: require('sugarss')})
      .then(function (result) {
        console.log(result.css)
        fs.writeFileSync('expects/index.sss.css', result.css)
        t.is(expected('index.sss.css'), result.css)
      })
  })
})

test('6 - Process SSS with custom plugins', function (t) {
  pluginsrc('postcssrc.json').then(function (plugins) {
    postcss(plugins)
      .process(fixtures('index.sss'), {parser: require('sugarss')})
      .then(function (result) {
        console.log(result.css)
        fs.writeFileSync('expects/custom.sss.css', result.css)
        t.is(expected('custom.sss.css'), result.css)
      })
  })
})
