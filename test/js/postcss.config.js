module.exports = function (ctx) {
  return {
    plugins: {
      'postcss-import': {},
      'postcss-nested': {},
      'postcss-sprites': {},
      'cssnano': ctx.env === 'development' ? false : {}
    }
  }
}
