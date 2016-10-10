module.exports = (ctx) => {
  return {
    plugins: {
      'postcss-import': null,
      'postcss-nested': null,
      'cssnano': ctx.env === 'development' ? false : null
    }
  }
}
