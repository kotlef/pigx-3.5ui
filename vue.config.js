/**
 * 配置参考:
 * https://cli.vuejs.org/zh/config/
 */
const url = 'http://pigx-gateway:9999'
module.exports = {
  lintOnSave: true,
  productionSourceMap: false,
  chainWebpack: config => {
    // 忽略的打包文件
    config.externals({
      'axios': 'axios'
    })
    const entry = config.entry('app')
    entry
      .add('babel-polyfill')
      .end()
    entry
      .add('classlist-polyfill')
      .end()
  },
  // 配置转发代理
  devServer: {
    disableHostCheck: true,
    port: 8080,
    proxy: {
      '/': {
        target: url,
        ws: false, // 需要websocket 开启
        pathRewrite: {
          '^/': '/'
        }
      }
      // 3.5 以后不需要再配置
    }
  }
}
