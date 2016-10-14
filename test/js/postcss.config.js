module.exports = function (ctx) {
  return {
    plugins: {
      'postcss-import': {},
      'postcss-nested': {},
      'cssnano': ctx.env === 'development' ? false : {}
    }
  }
}
