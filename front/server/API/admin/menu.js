const Router = require('koa-router')
const mongoose = require('mongoose')


let router = new Router()

/*新增一级菜单*/
router.post('/saveTopMenu',async(ctx)=>{
    let data = ctx.request.body
    const Menu = mongoose.model('menu')
    let newMenu  = new Menu({
        name: data.name,    
        order:data.order,
        children:[]
    })
    await newMenu.save().then(()=>{
        ctx.body={
            code:200
        }
    }).catch(error=>{
            ctx.body={
                code:500,
                message:error
            }
    })
})

/*新增二级菜单*/
router.post('/saveMenu',async(ctx)=>{
    let data = ctx.request.body
    const Menu = mongoose.model('menu')
    let code = 200
    await Menu.findById(data.f_id,function(err, menuData){
        //查询是否重复名称
        // var a = menuData.children.find((item)=>{
        //     return item.name == data.name
        // })
        // if(a){
        //     console.log("a")
        //     code = 500
        // }else{
            menuData.children.push({name:data.name,order:data.order,f_id:data.f_id})
            menuData.save()
       // }
    }).then(async()=>{
        console.log("then")
        ctx.body={
            code:200
        }
    }).catch(error=>{
            ctx.body={
                code:500,
                message:error
            }
    })
})

/*查询所有菜单*/
router.get('/searchAllMenu',async(ctx)=>{
    const menu = mongoose.model('menu')
        await menu.find()
        .sort({'_id':-1})
        .exec().then(async(result)=>{
            ctx.body={
                data:result
            }
        })
    })

/*删除一级和二级菜单*/
    router.delete('/deleteMenu',async(ctx)=>{
        let id = ctx.query.id
        let f_id = ctx.query.f_id
        const Menu = mongoose.model('menu')
        if(f_id){
            await Menu.findById(f_id, function(err, menuData){
                menuData.children = menuData.children.filter((item)=>{
                    return item._id != id
                })
                menuData.save()
            }).then(async(result)=>{
                ctx.body={
                    status:200,
                    message:'删除成功'
                }
            });
        }else{
            await Menu.remove({_id:id}).then(async(result)=>{
                ctx.body={
                    status:200,
                    message:'删除成功'
                }
            });
        }
    })
/*修改一级和二级菜单*/
    
router.post('/editTopMenu',async(ctx)=>{
    let data = ctx.request.body
    const Menu = mongoose.model('menu')
    if(data.f_id){
        await Menu.findById(data.f_id, function(err, menuData){
            //判断是否存在重复名称
            // let isSame = false
            // for(var i = 0; i < menuData.children.length; i++){
            //     if(menuData.children[i].name == data.name){
            //         isSame = true
            //     }
            //     if(menuData.children[i]._id == data._id){
            //         menuData.children[i].name = data.name
            //         menuData.children[i].order = data.order
            //     }
            // }
            // if (isSame) {

            // } else {
                menuData.save()
            //}
        }).then(()=>{
            ctx.body={
                code:200
            }
        }).catch(error=>{
            ctx.body={
                code:500,
                message:error
            }
        })
    }else{
        await Menu.updateOne({_id: data._id},data).then(()=>{
            ctx.body={
                code:200
            }
        }).catch(error=>{
                ctx.body={
                    code:500,
                    message:error
                }
        })
    }
})


module.exports =router