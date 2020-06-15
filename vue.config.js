const path = require('path');
const PrerenderSPAPlugin = require('prerender-spa-plugin');

const loadedDestinations = require('./src/assets/places.json');

const prerenderedRoutes = loadedDestinations.map((d) => `/destination/${d.slug}`);

console.log(prerenderedRoutes)

// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      new PrerenderSPAPlugin({
        staticDir: path.join(__dirname, 'dist'),
        routes: prerenderedRoutes,
        maxConcurrentRoutes: 10,
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
