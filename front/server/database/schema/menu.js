const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

//创建UserShema
const menuSchema = new Schema({
    menuId: {type:ObjectId},
    name: {unique:true,type:String},    
    order:{type:Number}, //顺序
    children:[{
        childMenuId: {type:ObjectId},
        f_id:{type:String},
        name: {type:String}, 
        order:{type:Number}, //顺序
    }]
},{
    collection:'menu'  
}) 

//发布模型
mongoose.model('menu',menuSchema)