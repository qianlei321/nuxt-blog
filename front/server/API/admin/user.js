const Router = require('koa-router')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken') //jwt
const jwtKoa = require('koa-jwt') //验证jwt的koa中间价
const secret = 'jwt demo'
const util = require('util')
const verify = util.promisify(jwt.verify) // 解密

let router = new Router()

/*管理员信息*/
router.get('/user',async(ctx)=>{
    const token = ctx.header.authorization  // 获取jwt
    let payload
    if (token) {
        payload = await verify(token.split(' ')[1], secret)  // // 解密，获取payload
        let data = ctx.request.body
        console.log(data)
        ctx.body = {
            payload
        }
    } else {
        ctx.body = {
            message: 'token 错误',
            code: -1
        }
    }
})
/*管理员-修改密码*/
router.post('/changePassword',async(ctx)=>{
    let data = ctx.request.body
    let newPassword = data.newPassword
    const token = ctx.header.authorization  // 获取jwt
    let payload
    if (token) {
        payload = await verify(token.split(' ')[1], secret)  // // 解密，获取payload
        console.log(payload)
        const User = mongoose.model('user_service')
        let newUser = new User()
        let hash = await newUser.setPassword(newPassword)
        await User.updateOne({userName:payload.userName}, {password: hash}, function(err, docs){
            if(err){
                ctx.body = {
                    message: '更改密码失败',
                    code: false
                }
            }else{
                ctx.body = {
                    message: '更改密码成功',
                    code: true
                }
            }
        })
        
    } else {
        ctx.body = {
            message: 'token 错误',
            code: -1
        }
    }
    
})

/*登录*/
router.post('/login',async(ctx)=>{
    let loginUser = ctx.request.body
    console.log('login',loginUser)
    let userName = loginUser.userName
    let password = loginUser.password
    let date = new Date()

    //引入user_service的model
    const User = mongoose.model('user_service')

    await User.findOne({userName:userName}).exec().then(async(result)=>{
        console.log(result)
        if(result){
            let newUser = new User()
            await newUser.comparePassword(password,result.password)
            .then(isMatch=>{
                if (isMatch) {
                    let userToken = {userName: userName}
                    const token = jwt.sign(userToken, secret, {expiresIn: '1h'})  //token签名 有效期为1小时
                    ctx.body={code:200,message:isMatch,user:result,token:token}
                }else{
                    ctx.body={code:200,message:isMatch,user:result}
                }
                
            })
            .catch(error=>{
                console.log(error)
                ctx.body={code:500,message:error}
            })
            await User.updateOne({userName:userName}, {lastLoginAt: date}, function(err, docs){
                if(err) console.log(err);
                console.log('更改lastLogin成功：' + docs);
            })
        }else{
            ctx.body={code:200,message:'用户名不存在'}
        }
    }).catch(error=>{
        console.log(error)
        ctx.body={code:500,message:error}
    })
})
module.exports =router