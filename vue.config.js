const { defineConfig } = require('@vue/cli-service');
const path = require('path');

module.exports = defineConfig({
  publicPath: './',  // ✅ Important for relative file paths in production

  transpileDependencies: [],

  devServer: {
    proxy: {
      '/api': {
        target: 'https://metro-failure-backend-code.onrender.com/generate_and_predict',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
});
