module.exports = function (ctx) {
  return {
    plugins: [
      require('postcss-import')(),
      // simulate the case of require('doiuse') without actually requiring it
      { postcss: require('postcss-nested')() },
      require('postcss-sprites')(),
      require('postcss-cssnext')({ warnForDuplicates: false }),
      ctx.env === 'production' ? require('cssnano')() : false
    ]
  }
}
