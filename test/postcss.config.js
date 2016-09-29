module.exports = {
  plugins: {
    'postcss-import': null,
    'postcss-nested': null,
    'postcss-bem': {
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
