'use strict'

const fs = require('fs')

var postcss = require('postcss')

var plugins = require('../index')()

var css = fs.readFileSync('./index.html', 'utf-8').toString()

postcss(plugins)
  .process(css)
  .then(result => console.log(result.css))
