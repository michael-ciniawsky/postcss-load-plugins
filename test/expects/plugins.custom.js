module.exports = [
  require('postcss-import')(),
  require('postcss-nested')(),
  require('postcss-bem')({
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
  })
]
