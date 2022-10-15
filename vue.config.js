const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = defineConfig({
  // 部署到服务器不要改这个东西
  // publicPath: './',
  outputDir: './build',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://152.136.185.210:4000',
        pathRewrite: {
          '/api': ''
        },
        changeOrigin: true
      }
    },
    historyApiFallback: true
  },
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  },
  transpileDependencies: true
})
