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
const pluginsrc = require('..')

let options = { from: 'fixtures/index.css', to: 'expect/index.css' }

test('Load Plugins (development)', (t) => {
  process.env.NODE_ENV = 'development'

  return pluginsrc().then((plugins) => {
    t.is(plugins.length, 2)

    t.is(plugins[0], require('postcss-import'))
    t.is(plugins[1], require('postcss-nested'))
  })
})

test('Load Plugins (production)', (t) => {
  process.env.NODE_ENV = 'production'

  return pluginsrc().then((plugins) => {
    t.is(plugins.length, 3)

    t.is(plugins[0], require('postcss-import'))
    t.is(plugins[1], require('postcss-nested'))
    t.is(plugins[2], require('cssnano'))
  })
})

test('Process CSS', (t) => {
  process.env.NODE_ENV = 'development'

  return pluginsrc().then((plugins) => {
    return postcss(plugins)
      .process(fixture('index.css'), options)
      .then((result) => {
        t.is(expect('index.css'), result.css)
      })
  })
})

test('Process SSS', (t) => {
  process.env.NODE_ENV = 'development'

  return pluginsrc().then((plugins) => {
    options = Object.assign(options, {
      parser: require('sugarss'),
      from: 'fixtures/index.sss'
    })

    return postcss(plugins)
      .process(fixture('index.sss'), options)
      .then((result) => {
        t.is(expect('index.sss'), result.css)
      })
  })
})
