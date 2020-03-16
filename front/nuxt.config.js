const pkg = require('./package')


module.exports = {
  mode: 'universal',
  server: {
    port: 3000, // default: 3000
    host: 'localhost' // default: localhost
  },

  /*
  ** Headers of the page
  */
  head: {
    title: "钱磊的博客",
    meta: [
      { 
        charset: 'utf-8' 
      },
      {
        hid: 'description',
        name: 'description',
        content:
          '一位专注全栈技术的前端工程师，整理工作所遇的各种所遇问题，分享个人个心得体会。前端即兴趣，兴趣即未来！！！'
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: '钱磊，前端，博客，前端博客，钱磊的博客，全栈技术，全栈博客，nuxt-blog，nuxt博客'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/logo.ico' }
    ],
    script: [
      {src: 'http://at.alicdn.com/t/font_1595091_qnhwzgrkos.js'}
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    'element-ui/lib/theme-chalk/display.css',
     { src: '@/assets/css/main.scss', lang: 'scss' } // 指定 scss
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/filters'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    proxy: true, // 表示开启代理
    prefix: '/api', // 表示给请求url加个前缀 /api
    credentials: true // 表示跨域请求时是否需要使用凭证
  },
  proxy: {
    '/api': { 
      target: 'http://localhost:3000', // 目标接口域名
      pathRewrite: {
        '^/api': '/api', // 把 /api 替换成 /api
        changeOrigin: true // 表示是否跨域
      }    
    }
  },

  /*
  ** Build configuration
  */
  build: {
    //transpile: [/^element-ui/],
    // 按需引入element-ui
    babel: {
      plugins: [
        [ "component", 
          {
            "libraryName": "element-ui",
            "styleLibraryName": "theme-chalk"
          }
        ] 
      ] 
    },

    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      
    }
  }
}
