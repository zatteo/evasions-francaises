// vue.config.js
module.exports = {
  publicPath: '/',
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
