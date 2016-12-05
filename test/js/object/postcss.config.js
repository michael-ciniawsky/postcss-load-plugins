module.exports = function (ctx) {
  return {
    plugins: {
      'postcss-import': {},
      'postcss-nested': {},
      'postcss-sprites': {},
      'postcss-cssnext': { warnForDuplicates: false },
      'cssnano': ctx.env === 'production' ? {} : false
    }
  }
}
