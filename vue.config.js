const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  outputDir: "docs",
  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  },
  publicPath: process.env.NODE_ENV === "production" ? "/product-listing/" : "/"
})