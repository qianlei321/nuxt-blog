const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const { connect , initSchemas } = require('./database/init.js')//数据库连接，数据初始化
const mongoose = require('mongoose')  //mongodb连接中间件
const bodyParser = require('koa-bodyparser') // 数据解析
const Router = require('koa-router') //路由
const cors = require('koa2-cors')  //跨域
const jwt = require('jsonwebtoken') //jwt
const jwtKoa = require('koa-jwt') //验证jwt的koa中间价
const secret = 'jwt demo'
const koaBody = require('koa-body'); // 文件上传中间件

const app = new Koa()

// 导入nuxt配置文件
let config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

async function start() {
  //解决跨域问题
  app.use(cors())
  // 配置ctx.body解析中间件,bodyParser与koaBody不兼容，
  //app.use(bodyParser())
  // 配置koaBody中间件,与bodyParser不兼容
  app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200*1024*1024    // 设置上传文件大小最大限制，默认2M
    }
  }));
  //对错误进行处理，返回状态码，前端response接收
  app.use(async (ctx,next) => {
    try{
        await next()
    }catch(err){
        ctx.response.status = err.statusCode || err.status || 500;
        ctx.response.body = {
            message: err.message
        };
    }
  });

  //使用jwt验证
  app.use(jwtKoa({secret: secret}).unless({
    path: [/^\/api\/admin\/user\/login/,/^\/api\/front\/*/,/^\/api\/admin\/file\/download/,/^((?!\/api).)*$/] //数组中的路径不需要通过jwt验证
  }))

  //引入子路由文件
  let user = require('./API/admin/user.js')
  let file = require('./API/admin/file.js')
  let article = require('./API/admin/article.js')
  let menu = require('./API/admin/menu.js')
  let index = require('./API/front/index.js')
  //装载所有子路由
  let router = new Router({
    prefix:'/api/'
  })
  router.use('admin/user',user.routes())
  router.use('admin/file',file.routes())
  router.use('admin/article',article.routes())
  router.use('admin/menu',menu.routes())
  router.use('front',index.routes())
  
  //实例化nuxt.js
  const nuxt = new Nuxt(config)
  //会读取 nuxt.config.js 中的配置项，判断是否指定路径和端口，当不存在时会赋值默认值
  const {
    host = process.env.HOST || '127.0.0.2',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // 在开发模式下启用编译构建和热加载
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }
  // 初始化路由中间件
  app.use(router.routes()).use(router.allowedMethods())
  //把Nuxt.js变成koa2的中间件,建议把 nuxt.render 放到中间件列表的最后面，因为它不会再调用 next() 方法
  app.use(ctx => {
    ctx.status = 200
    ctx.respond = false // 绕过Koa的内置响应处理
    ctx.req.ctx = ctx // 这在以后可能会有用，例如在nuxtserverinit或nuxt stash中。
    nuxt.render(ctx.req, ctx.res)
  })
  //运行数据库连接，数据初始化
  ;(async ()=>{
    await connect()
    initSchemas()
  })()  
  //启动服务器监听
  app.listen(port, host)
  consola.ready({
    message: `服务端已启动 http://${host}:${port}`,
    badge: true
  })
}

start()