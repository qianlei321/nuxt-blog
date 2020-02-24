# 项目简介
> 前台使用vue-ssr(nuxt)进行服务端渲染,通过服务端渲染,可以优化SEO抓取,提升首页加载速度,同时使用koa2编写后台接口，接口使用jwt技术进行身份认证提升安全性。

> 后台使用vue开发

> 数据库使用非关系型数据库(mongoDB)

# 说明
    一.后台(admin)
        vue项目
        1.启动方式：npm run dev

    二.前台(front)
        nuxt项目
        1.启动方式：npm run dev
        
    三. koa2后台接口 (front/server)
        1.启动方式：随前台服务一起（npm run dev）
        2.结构
            API(请求接口)
            database(数据库相关)
            upload(上传文件存储)
            utils(工具类)
            index.js(主方法)
# 功能
    一.后台(admin)
        1.菜单管理
        2.文章管理
        3.文件管理
        4.密码更改
    二.前台(front) 
        1.首页
        2.首页侧边栏
        3.文章分类
        4.标签分类
        5.附件下载  

# 数据库
    menu (菜单)
        menuId : ObjectId
        name: {unique:true,type:String},    
        order:{type:Number}, //顺序
        children:[{
            name: {unique:true,type:String}, 
            order:{type:Number}, //顺序
        }]
    article (文章)
        articleId : ObjectId
        type : String  //文章类型
        original : Boolean //是否原创
        title: String  //标题
        abstract: String  //前言
        picture: String,  //图片
        content: String  //内容
        publish: Boolean  //公开
        tag: Array //标签
        commentNum: Number //浏览量
        likeNum: Number  //喜欢
        pv: Number
        date: Date 

    file (文件)
        fileId: ObjectId
        fileName: String,
        path : String //硬盘绝对路径
        downloadPath : String,
        createTime : Date
        downloadNum : Number

    user_service (后台管理用户)
        UserId : ObjectId 
        userName : String
        password : String
        createAt : Date
        lastLoginAt : Date

    tag (标签)
        tagId : ObjectId
        name : type:String  
        date : Date

# 接口
    一.后台(admin)
        article.js
            /api/admin/article/getTag  /*获取所有标签*/
            /api/admin/article/saveArticle /*存储文章*/
            /api/admin/article/editArticle /*更改文章*/
            /api/admin/article/deleteArtices /*文章-删除*/
            /api/admin/article/searchArtices /*查找文章*/
            /api/admin/article/changePublish /*更改文章状态*/
        file.js
            /api/admin/file/uploadfiles /*文件-上传多个文件*/
            /api/admin/file/download/:name /*文件-下载*/
            /api/admin/file/deleteFile /*文件-删除*/
            /api/admin/file/searchFile /*文件-查找*/
            /api/admin/file/searchPictureFile /*文件-查找上传文件中的图片文件*/
        user.js
            /api/admin/user/user /*管理员信息*/
            /api/admin/user/changePassword /*管理员-修改密码*/
            /api/admin/user/login /*登录*/
        menu.js
            /api/admin/menu/saveTopMenu /*新增一级菜单*/
            /api/admin/menu/saveTopMenu /*新增二级菜单*/
            /api/admin/menu/searchAllMenu /*查询所有菜单*/
            /api/admin/menu/deleteMenu /*删除一级和二级菜单*/
            /api/admin/menu/editTopMenu /*修改一级和二级菜单*/
    二.前台(front) 
        index.js
            /api/front/searchAllMenu /*查询所有菜单*/
            /api/front/allArtices /*查询所有文章*/
            /api/front/ArticesByPage /*分页查询文章*/
            /api/front/searchAllMenuNum /*查询所有菜单数量*/
            /api/front/searchAllArticleNum /*查询所有文章数量*/
            /api/front/searchAllTagNum /*查询所有标签数量*/
            /api/front/searchLastArticleDate /*查询最后文章创建时间*/
            /api/front/searchIcon15 /*查询前15个标签*/
            /api/front/allTags /*查询所有标签*/
            /api/front/searchArtice /*按id查找文章*/
            /api/front/category_Artices /*按分类查找全部文章*/
            /api/front/category_ArticesByPage /*按分类分页查找文章*/
            /api/front/tags_Artices /*按标签查找全部文章*/
            /api/front/tags_ArticesByPage /*按标签分页查找文章*/
# 部署文档
    一、配置文件位置
        1.后台(admin)
            src/assets/js/config.js [使用Nginx反向代理则无需更改]
        2.前台(front)
            nuxt.config.js [使用Nginx反向代理则无需更改]     
        3.koa2后台接口 (front/server)
            database/init.js  [更改mongoDB主机地址和数据库]
    二、打包
        1.后台(admin)
            在admin根目录运行'npm run build',"dist"文件夹为打包后文件
        2.前台(front)和koa2后台接口 (front/server)
            在admin根目录运行'npm run build'，打包以下文件夹和文件
            ● ".nuxt"文件夹
            ● "server"文件夹
            ● "static"文件夹
            ● "nuxt.config.js"文件
            ● "package.json"文件
    三、公网部署
        1.后台(admin)
            Nginx反向代理
        2.前台(front)和koa2后台接口 (front/server)
            PM2部署
            Nginx反向代理
# 帮助文档
前台(front)界面查看--> [我的博客](http://qiann.cn "钱磊的博客")