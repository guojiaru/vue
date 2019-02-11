const path = require('path')

function resolve(url) {
  return path.resolve(__dirname, url)
}

module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias
      .set('components', resolve('./src/components'))
      .set('styles', resolve('./src/assets/styles'))
      .set('assets', resolve('./src/assets'))
      .set('pages', resolve('./src/pages'))
      .set('utils', resolve('./src/utils'))
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://10.100.38.81',
        changeOrigin: true,
      }
    }
  }
}