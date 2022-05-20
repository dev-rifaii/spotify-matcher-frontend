const { defineConfig } = require('@vue/cli-service')
module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8080/spotifymatcher",
        ws: true,
        changeOrigin: true
      }
    }
  }
};