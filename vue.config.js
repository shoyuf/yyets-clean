module.exports = {
  devServer: {
    proxy: 'http://pc.zmzapi.com',
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        // options placed here will be merged with default configuration and passed to electron-builder
      },
    },
  },
};
