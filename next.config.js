module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    if (isServer) {
      config.externals = {
        '../../pkg/tideman_lib': `commonjs2 ${require('path').join(__dirname, 'pkg/tideman_lib.js')}`
      }
    }

    // Important: return the modified config
    return config
  },
}
