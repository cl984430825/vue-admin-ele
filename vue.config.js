module.exports = {
  // 代码规范检查
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    // 环境配置
    host: "0.0.0.0",
    port: 8001,
    https: false,
    hotOnly: false,
    open: true, //配置自动启动浏览器
    proxy: {
      "/proxy": {
        target: "http://192.9.100.116:8088",
        changeOrigin: true,
        pathRewrite: {
          "^/proxy": ""
        }
      }
    }
  }
};
