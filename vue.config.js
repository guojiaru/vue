const path = require('path')

function resolve (url) {
  return path.resolve(__dirname, url)
}

module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias
      .set('components', resolve('./src/components'))
      .set('styles', resolve('./src/assets/styles'))
      .set('assets', resolve('./src/assets'))
      .set('pages',resolve('./src/pages'))
      .set('utils',resolve('./src/utils'))
  },
  devServer:{
    proxy:{
      '/shunt/favorite/':{
        target:'https://m.zbj.com',
        changeOrigin:true,
      }
    }
  }
}