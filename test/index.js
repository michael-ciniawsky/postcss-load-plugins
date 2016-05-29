'use strict'

const fs = require('fs')

const postcss = require('postcss')
const plugins = require('../index')()

const css = fs.readFileSync('./fixtures/index.css', 'utf8')

console.log(plugins)

// postcss()
//   .process(css)
//   .then(result => console.log(result.css))
