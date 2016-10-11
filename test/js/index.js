// ------------------------------------
// #POSTCSS - LOAD PlUGINS - TEST
// ------------------------------------

'use strict'

var test = require('ava')

const join = require('path').join
const read = require('fs').readFileSync

const fixture = (file) => read(join(__dirname, 'fixtures', file), 'utf8')
const expect = (file) => read(join(__dirname, 'expect', file), 'utf8')

const postcss = require('postcss')
const pluginsrc = require('../..')

test('postcss.config.js - {Function} - Load Plugins', (t) => {
  process.env.NODE_ENV = 'development'

  return pluginsrc().then((plugins) => {
    t.is(plugins.length, 2)

    t.is(plugins[0], require('postcss-import'))
    t.is(plugins[1], require('postcss-nested'))
  })
})

test('postcss.config.js - {Function} - Load Plugins', (t) => {
  process.env.NODE_ENV = 'production'

  return pluginsrc().then((plugins) => {
    t.is(plugins.length, 3)

    t.is(plugins[0], require('postcss-import'))
    t.is(plugins[1], require('postcss-nested'))
    t.is(plugins[2], require('cssnano'))
  })
})

test('postcss.config.js - {Function} - Process CSS', (t) => {
  process.env.NODE_ENV = 'development'

  return pluginsrc().then((plugins) => {
    const options = {
      from: 'fixtures/index.css',
      to: 'expect/index.css'
    }

    return postcss(plugins).process(fixture('index.css'), options).then((result) => {
      t.is(expect('index.css'), result.css)
    })
  })
})

test('postcss.config.js - {Function} - Process SSS', (t) => {
  process.env.NODE_ENV = 'development'

  return pluginsrc().then((plugins) => {
    const options = {
      parser: require('sugarss'),
      from: 'fixtures/index.sss',
      to: 'expect/index.sss'
    }

    return postcss(plugins).process(fixture('index.sss'), options).then((result) => {
      t.is(expect('index.sss'), result.css)
    })
  })
})
