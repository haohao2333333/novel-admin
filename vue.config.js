const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  chainWebpack: config => {
    config
    .plugin('html')
    .tap(args => {
        args[0].title = '小说影音系统'
        return args
    })},
   // lintOnSave:false,
   devServer: {
    port: 8080, // 端口
    proxy: {
      '/api/user': {  //   若请求的前缀不是这个'/api'，那请求就不会走代理服务器
        target: 'http://localhost:10086',  //这里写路径 
        pathRewrite: { '^/api/user': '' }, //将所有含/api路径的，去掉/api转发给服务器
        ws: true,  //用于支持websocket
        changeOrigin: true   //用于控制请求头中的host值
      },
      '/api/novel': {  
        target: 'http://localhost:10087',
        pathRewrite: { '^/api/novel': '' },
        ws: true,
        changeOrigin: true
      },
    }
  }
})
