const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
const bcrypt = require('bcryptjs')  //加密解密
const SALT_WORK_FACTOR = 10
const defaultUser = {
    userName : 'qianlei',
    password : '0421081x',
}

//创建UserShema
const userSchema = new Schema({
    UserId :{type:ObjectId},
    userName : {type:String},
    password : String,
    createAt:{type:Date, default:() => Date.now()},
    lastLoginAt:{type:Date, default:() => Date.now()}
},{
    collection:'user_service'  
}) 
userSchema.pre('save', function(next){
    bcrypt.genSalt(SALT_WORK_FACTOR,(err,salt)=>{
        if(err) return next(err)
        bcrypt.hash(this.password,salt,(err,hash)=>{
            if(err) return next(err)
            this.password = hash
            next()
        })
    })
})

userSchema.methods={
    comparePassword:(_password,password)=>{
        return new Promise((resolve,reject)=>{
            bcrypt.compare(_password,password,(err,isMatch)=>{
                if(!err) resolve(isMatch)
                else reject(err)
            })
        })
    },
    setPassword:(password)=>{
        return new Promise((resolve,reject)=>{
            bcrypt.genSalt(SALT_WORK_FACTOR,(err,salt)=>{
                bcrypt.hash(password,salt,(err,hash)=>{
                    resolve(hash)
                })
            })
        })
    }
    
}

//发布模型
mongoose.model('user_service',userSchema)

/*初始化管理员*/
const User = mongoose.model('user_service')
User.findOne({userName:defaultUser.userName}).exec().then(async(result)=>{
    if (result) {
        console.log('默认管理员已存在');
    } else {
        let user = new User(defaultUser)
        user.save(function(err, res) {
            console.log('默认管理员已初始化');
        });
    }
})
