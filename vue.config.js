const path = require('path');
const PrerenderSPAPlugin = require('prerender-spa-plugin');

// vue.config.js
module.exports = {
  publicPath: '/',
  configureWebpack: {
    plugins: [
      new PrerenderSPAPlugin({
        staticDir: path.join(__dirname, 'dist'),
        routes: ['/destination/afrique-sud'],
      }),
    ],
  },
  chainWebpack: (config) => {
    config.module
      .rule('eslint')
      .use('eslint-loader')
      .loader('eslint-loader')
      .tap((options) => {
        options.emitWarning = true;
        return options;
      });
  },
};
