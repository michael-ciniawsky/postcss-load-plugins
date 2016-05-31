// ------------------------------------
// #POSTCSS - LOAD OPTIONS - TEST
// ------------------------------------

'use strict'

const test = require('ava')

const postcss = require('postcss')
const pluginsrc = require('../index')()

const { readFileSync, writeFileSync } = require('fs')

function readSync (path) {
  return readFileSync(path, 'utf8')
}

function writeSync (path, file) {
  return writeFileSync(path, file, 'utf8')
}

test('Process CSS with default plugins', (t) => {
  pluginsrc.then((plugins) => {
    postcss(plugins)
      .process(readSync('./fixtures/index.css'))
      .then(result => {
        writeSync('./expect/index.css', result.css)
        t.equal(result.css, readSync('./expect/index.css'))
        writeSync('./results/index.css', result.css)
      })
  })
})

test('Process SSS with default plugins', (t) => {
  pluginsrc.then((plugins) => {
    postcss(plugins)
      .process(readSync('./fixtures/index.sss'), {parser: require('sugarss')})
      .then(result => {
        writeSync('./expect/index-sss.css', result.css)
        t.equal(result.css, readSync('./expect/index.css'))
        writeSync('./results/index-sss.css', result.css)
      })
  })
})
