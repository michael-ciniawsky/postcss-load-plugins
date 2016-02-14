// ------------------------------------
// #POSTCSS - LOAD PLUGINS
// ------------------------------------

'use strict'

let postcss = require('postcss')

exports = module.exports = function (options) {
  if (typeof options === 'string') {
    options = require(`${process.cwd() + '/' + options}`)
  } else {
    options = options || require(`${process.cwd() + '/package.json'}`).postcss || {}
  }

  var pkg = require(`${process.cwd() + '/package.json'}`)

  function Processor (plugin, options) {
    function namespace (plugin) {
      let namespace = plugin
        .slice(9)
        .replace(/-(\w)/g, (match) => {
          return match.replace(/-/, '').toUpperCase()
        })
      return `${namespace}`
    }

    return {
      plugin: require(`${plugin}`),
      namespace: namespace(plugin),
      defaults: {}
    }
  }

  function isPlugin (element, index, array) {
    return element.match(/postcss-[\w]/)
  }

  function isImport (element, index, array) {
    return element.match(/postcss-[import]/)
  }

  function notImport (element, index, array) {
    return element.match(/postcss-[^import]/)
  }

  var processors = []

  Object.keys(pkg.dependencies).filter(isPlugin).filter(isImport).forEach((plugin) => {
    processors.unshift(new Processor(plugin))
  })

  Object.keys(pkg.dependencies).filter(isPlugin).filter(notImport).forEach((plugin) => {
    processors.push(new Processor(plugin))
  })

  Object.keys(pkg.devDependencies).filter(isPlugin).filter(isImport).forEach((plugin) => {
    processors.unshift(new Processor(plugin))
  })

  Object.keys(pkg.devDependencies).filter(isPlugin).filter(notImport).forEach((plugin) => {
    processors.push(new Processor(plugin))
  })

  var instance = postcss()

  processors.forEach((processor) => {
    var namespaceOptions = processor.namespace in options ? options[processor.namespace] : options
    var processorOptions = {}

    Object.keys(processor.defaults).forEach((key) => {
      processorOptions[key] = processor.defaults[key]
    })

    Object.keys(namespaceOptions).forEach((key) => {
      processorOptions[key] = namespaceOptions[key]
    })

    if (namespaceOptions && !processorOptions.disable) {
      instance.use(processor.plugin(processorOptions))
    }
  })

  return instance
}
