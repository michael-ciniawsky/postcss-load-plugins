module.exports = function (ctx) {
  return {
    plugins: {
      'no plugin': ctx.next ? false : {},
      'no plugin options': ctx.next === 2 ? false : { option: 'value' },
      '../test/err/plugin.js': {}
    }
  }
}
