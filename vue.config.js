// const { SkeletonPlugin } = require('page-skeleton-webpack-plugin')
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin') // 去掉注释
const CompressionWebpackPlugin = require('compression-webpack-plugin') // 开启压缩
const { HashedModuleIdsPlugin } = require('webpack')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const cdn = {
  // 开发环境
  dev: {
    css: [
      'https://unpkg.com/element-ui/lib/theme-chalk/index.css'
    ],
    js: []
  },
  // 生产环境
  build: {
    css: [
      'https://unpkg.com/element-ui/lib/theme-chalk/index.css'
    ],
    js: [
      'https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.min.js',
      'https://cdn.jsdelivr.net/npm/vue-router@3.0.1/dist/vue-router.min.js',
      'https://cdn.jsdelivr.net/npm/vuex@3.0.1/dist/vuex.min.js',
      'https://cdn.jsdelivr.net/npm/axios@0.18.0/dist/axios.min.js',
      'https://unpkg.com/element-ui/lib/index.js'
    ]
  }
}

// cdn预加载使用
const externals = {
  'vue': 'Vue',
  'vue-router': 'VueRouter',
  'vuex': 'Vuex',
  'axios': 'axios',
  'element-ui': 'ELEMENT'
}

module.exports = {
  publicPath: './',
  devServer: {
    open: false,
    port: 8888,
    https: false,
    hotOnly: false, // 热更新
    proxy: {
      '^/oss': {
        target: 'https://target.com/user/commer',
        ws: true, // 开启websocket
        secure: false, // 如果是https接口，需要这个参数
        changeOrigin: true
      }
    }
  },
  configureWebpack: config => {
    const plugins = []
    // plugins.push(
    //   new SkeletonPlugin({
    //     pathname: path.resolve(__dirname, './shell'), // 用来存储 shell 文件的地址
    //     staticDir: path.resolve(__dirname, './dist'), // 最好和 `output.path` 相同
    //     routes: ['/', '/lottery'] // 将需要生成骨架屏的路由添加到数组中
    //   })
    // )
    if (process.env.NODE_ENV === 'production') {
      plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            output: {
              comments: false
            },
            warnings: false,
            compress: {
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ['console.log'] // 移除console
            }
          }
        })
      )
      // 服务器开启gzip
      plugins.push(
        new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: /\.(js|css)$/, // 匹配文件名
          threshold: 10000, // 对超过10k的数据压缩
          deleteOriginalAssets: false, // 不删除源文件
          minRatio: 0.8 // 压缩比
        })
      )
      // 用于根据模块的相对路径生成 hash 作为模块 id, 一般用于生产环境
      plugins.push(
        new HashedModuleIdsPlugin()
      )
      // 开启分离js
      config.optimization = {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: Infinity,
          minSize: 1000 * 60,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                // 排除node_modules 然后吧 @ 替换为空 ,考虑到服务器的兼容
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                return `npm.${packageName.replace('@', '')}`
              }
            }
          }
        }
      }
      // 拷贝文件到指定目录，比如一些网站在根目录需要验证某些文本， from为文件的路径，还有一个to属性是输出的文件夹路径，不写则默认复制到打包后文件的根目录
      // plugins.push(
      //   new CopyWebpackPlugin([{ from: './NLwdLAxhwv.txt' }])
      // )
      // 取消webpack警告的性能提示
      config.performance = {
        hints: 'warning',
        // 入口起点的最大体积
        maxEntrypointSize: 1000 * 500,
        // 生成文件的最大体积
        maxAssetSize: 1000 * 1000,
        // 只给出 js 文件的性能提示
        assetFilter: function(assetFilename) {
          return assetFilename.endsWith('.js')
        }
      }
      // 打包时npm包转CDN
      config.externals = externals
    }
    return { plugins }
  },
  chainWebpack: config => {
    // 解决vue-cli3脚手架创建的项目压缩html 干掉<!-- shell -->导致骨架屏不生效
    if (process.env.NODE_ENV !== 'development') {
      config.plugin('html').tap(opts => {
        opts[0].minify.removeComments = false
        return opts
      })
    }

    config.resolve.alias
      .set('@', resolve('src'))
      .set('components', resolve('src/components'))
      .set('views', resolve('src/views'))
      .set('store', resolve('src/store'))
      .set('assets', resolve('src/assets'))
      .set('api', resolve('src/api'))

    // 压缩图片
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({ bypassOnDebug: true })

    // webpack 会默认给commonChunk打进chunk-vendors，所以需要对webpack的配置进行delete
    config.optimization.delete('splitChunks')

    config.plugin('html').tap(args => {
      if (process.env.NODE_ENV === 'production') {
        args[0].cdn = cdn.build
      }
      if (process.env.NODE_ENV === 'development') {
        args[0].cdn = cdn.dev
      }
      return args
    })
    // 资源分析
    // config
    //   .plugin('webpack-bundle-analyzer')
    //   .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
  },
  css: {
    // loaderOptions: {
    //   postcss: {
    //     plugins: [
    //       require('postcss-pxtorem')({
    //         rootValue: 75, // 换算的基数 1rem = 75px 这个是根据750px设计稿来的，如果是620 的就写 62
    //         // 忽略转换正则匹配项。插件会转化所有的样式的px。比如引入了三方UI，也会被转化。目前我使用selectorBlackList字段，来过滤
    //         // 如果个别地方不想转化px。可以简单的使用大写的 PX 或 Px 。
    //         selectorBlackList: ['weui', 'mu'], //
    //         propList: ['*'] // 需要做转化处理的属性，如`hight`、`width`、`margin`等，`*`表示全部
    //       })
    //     ]
    //   }
    // }
  }
}
