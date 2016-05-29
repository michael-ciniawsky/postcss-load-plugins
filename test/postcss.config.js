module.exports = {
  parser: 'postcss-less',
  map: 'inline',
  plugins: {
    'postcss-nested': null,
    'postcss-bem': {
      defaultNamespace: 'undefined',
      style: 'bem',
      separators: {
        namespace: '-',
        descendent: '__',
        modifier: '--'
      },
      shortcuts: {
        component: 'block',
        descendent: 'elem',
        modifier: 'mods'
      }
    }
  }
}
