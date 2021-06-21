module.exports = {
  publicPath: '/movie-list-vuejs/',
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/assets/scss/_global.scss";`
      },
    }
  }
}
