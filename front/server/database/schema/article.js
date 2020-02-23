const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

//创建UserShema
const articleSchema = new Schema({
    articleId: {type:ObjectId},
    type:String,  //文章类型
    original: Boolean, //是否原创
    title: {unique:true,type:String},  //标题
    abstract: String,  //前言
    picture: String,  //图片
    content: String,  //内容
    publish: Boolean,  //公开
    tag: Array,  //标签
    commentNum: Number, //浏览量
    likeNum: Number,  //喜欢
    pv: Number,
    date: {type:Date, default:() => Date.now()}
},{
  collection:'article'  
}) 


//发布模型
mongoose.model('article',articleSchema)
