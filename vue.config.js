const path = require('path');
const PrerenderSPAPlugin = require('prerender-spa-plugin');

const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;

const loadedDestinations = require('./src/assets/places.json');

const prerenderedRoutes = loadedDestinations.map((d) => `/destination/${d.slug}`);

// vue.config.js
module.exports = {
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(
        new PrerenderSPAPlugin({
          staticDir: path.join(__dirname, 'dist'),
          routes: prerenderedRoutes,
          renderer: new Renderer({
            maxConcurrentRoutes: 10,
          }),
        }),
      );
    }
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
