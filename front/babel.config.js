/* eslint-env node */

module.exports = api => {
  return {
    presets: [
      [
        '@quasar/babel-preset-app',
        // eslint-disable-next-line
        api.caller(caller => caller && caller.target === 'node')
          ? { targets: { node: 'current' } }
          : {}
      ]
    ]
  }
}

