const { defineConfig } = require('@vue/cli-service');
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: [], // Changed from true to an empty array

  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8002/generate_and_predict',  // Your backend URL
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''  // Removes /api from the request
        }
      }
    }
  }
});

