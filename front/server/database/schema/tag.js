const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

//创建UserShema
const tagSchema = new Schema({
    tagId: {type:ObjectId},
    name: {unique:true,type:String},    
    date: {type:Date, default:() => Date.now()}
},{
  collection:'tag'  
}) 

//发布模型
mongoose.model('tag',tagSchema)