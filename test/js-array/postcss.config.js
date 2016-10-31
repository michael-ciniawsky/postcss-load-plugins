module.exports = function (ctx) {
  return {
    plugins: [
      require('postcss-import')(),
      // simulate the case of require('doiuse') without actually requiring it
      {
        postcss: require('postcss-nested').postcss
      },
      require('postcss-sprites'),
      ctx.env === 'development' ? false : require('cssnano')({}),
    ].filter(Boolean)
  }
}
