const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

//创建UserShema
const fileSchema = new Schema({
    fileId: {type: ObjectId},
    fileName: String,
    path: {unique: true,type: String}, //硬盘绝对路径
    downloadPath: String,
    createTime: {type: Date,default: () => Date.now()},
    downloadNum: {type: Number,default: 0}
}, {
  collection: 'file'
})

//发布模型
mongoose.model('file', fileSchema)
