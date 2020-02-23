## 说明
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
## 功能
    一.后台(admin)
        1.菜单管理
        2.文章管理
        3.文件管理
        4.密码更改
    二.前台(front) 
        1.首页
        2.首页侧边栏
        2.文章分类
        3.附件下载  

## 数据库
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

## 接口
    一.后台(admin)
        article.js
            /admin/article/getTag  /*获取所有标签*/
            /admin/article/saveArticle /*存储文章*/
            /admin/article/editArticle /*更改文章*/
            /admin/article/deleteArtices /*文章-删除*/
            /admin/article/searchArtices /*查找文章*/
            /admin/article/changePublish /*更改文章状态*/
        file.js
            /admin/file/uploadfiles /*文件-上传多个文件*/
            /admin/file/download/:name /*文件-下载*/
            /admin/file/deleteFile /*文件-删除*/
            /admin/file/searchFile /*文件-查找*/
        user.js
            /admin/user/user /*管理员信息*/
            /admin/user/changePassword /*管理员-修改密码*/
            /admin/user/login /*登录*/
    二.前台(front) 

## 帮助文档

手机适应
404页
菜单优化
触底加载