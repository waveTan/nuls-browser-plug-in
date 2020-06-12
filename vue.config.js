const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
const isProduction = process.env.NODE_ENV === 'production';

// Generate pages object
const pagesObj = {};

const chromeName = ["popup", "options"];

chromeName.forEach(name => {
  pagesObj[name] = {
    entry: `src/${name}/index.js`,
    template: "public/index.html",
    filename: `${name}.html`
  };
});

let plugins =
  process.env.NODE_ENV === "production" ? [{
    from: path.resolve("src/manifest.production.json"),
    to: `${path.resolve("dist")}/manifest.json`
  }] : [{
    from: path.resolve("src/manifest.development.json"),
    to: `${path.resolve("dist")}/manifest.json`
  }];
plugins.push({
  from: path.resolve("src/assets/img/icon.png"),
  to: `${path.resolve("dist")}/img/icon.png`
});
plugins.push({
  from: path.resolve("src/background.js"),
  to: `${path.resolve("dist")}/background.js`
});

module.exports = {
  pages: pagesObj,
  configureWebpack: {
    plugins: [
      CopyWebpackPlugin(plugins),
      // // keep module.id stable when vendor modules does not change
      // new webpack.HashedModuleIdsPlugin(),
      // // enable scope hoisting
      // new webpack.optimize.ModuleConcatenationPlugin(),
    ]
  },

  chainWebpack: config => {
    /*config.resolve.alias
      .set('@', resolve('./src'));*/

    // 查看打包组件大小情况
    if (process.env.npm_config_report) {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }

    if (isProduction) {
      config.plugins.push(new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      }));

    }
    config.externals = {
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      /*'vuex': 'Vuex',*/
      'moment': 'moment',
      'echarts': 'echarts',
      'element-ui': 'ELEMENT',
    }
  },
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  },
  productionSourceMap: false,
  css: {
    sourceMap: true
  },
  devServer: {
    port: 8080,
    host: '0.0.0.0',
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器
    proxy: {// 配置跨域处理
      '/api': {
        target: 'http://192.168.1.127:8080/',
        changeOrigin: true,  // 是否跨域
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
};
