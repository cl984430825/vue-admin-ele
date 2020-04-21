module.exports = {
  devServer: {
    // 环境配置
    host: "0.0.0.0",
    port: 8001,
    https: false,
    hotOnly: false,
    open: true, //配置自动启动浏览器
    proxy: {
      "/api": {
        target: "<url>",
        changeOrigin: true,
        pathRewrite: {
          "/^api": ""
        }
      }
    }
  }
};
