const Router = require('koa-router')
const mongoose = require('mongoose')

let router = new Router()

/*查询所有菜单*/
router.get('/searchAllMenu',async(ctx)=>{
    const menu = mongoose.model('menu')
    await menu.find()
    .sort("order")
    .exec().then(async(result)=>{
        ctx.body=result
    })
})

/*查询所有文章*/
router.get('/allArtices',async(ctx)=>{
    const article = mongoose.model('article')
    await article.find({publish:true})
        .sort("-date")
        .exec().then(async(result)=>{
            ctx.body=result
        })
})

/*分页查询文章*/
router.get('/ArticesByPage',async(ctx)=>{
    const article = mongoose.model('article')
    let query = ctx.query;
    await article.countDocuments({publish:true}, (error, count) => {}).then(async(count)=>{
        await article.find({publish:true}).skip((query.pageNo - 1) * query.pageSize).limit(parseInt(query.pageSize)||10) .sort("-date").exec().then(async(result)=>{
            ctx.body={
                status: 200,
                data: result,
                total: count,
                msg:'OK'
            }
        })
    })  
})

/*查询所有菜单数量*/
router.get('/searchAllMenuNum',async(ctx)=>{
    const menu = mongoose.model('menu')
    await menu.find()
    .sort("order")
    .exec().then(async(result)=>{
        let count = 0
        result.forEach((element)=>{
            count += element.children.length
        })
        ctx.body={
            count:count
        }
    })
})

/*查询所有文章数量*/
router.get('/searchAllArticleNum',async(ctx)=>{
    const article = mongoose.model('article')
    await article.find({"publish":true}).count().then(async(count)=>{
        ctx.body={
            count:count
        }
    })
})

/*查询所有标签数量*/
router.get('/searchAllTagNum',async(ctx)=>{
    const tag = mongoose.model('tag')
    await tag.count().then(async(count)=>{
        ctx.body={
            count:count
        }
    })
})

/*查询最后文章创建时间*/
router.get('/searchLastArticleDate',async(ctx)=>{
    const article = mongoose.model('article')
    await article.find()
        .sort("-date")
        .exec().then(async(result)=>{
            ctx.body={
                date:result[0].date
            }
        })
})

/*查询前15个标签*/
router.get('/searchIcon15',async(ctx)=>{
    const tag = mongoose.model('tag')
    await tag.find()
        .sort("-date")
        .exec().then(async(result)=>{
            ctx.body={
                date:result.slice(0,15)
            }
        })
})

/*查询所有标签*/
router.get('/allTags',async(ctx)=>{
    const tag = mongoose.model('tag')
    await tag.find()
        .sort("-date")
        .exec().then(async(result)=>{
            ctx.body={
                date:result
            }
        })
})

/*按id查找文章*/
router.get('/searchArtice',async(ctx)=>{
    let id = ctx.query.id
    const article = mongoose.model('article')
    //增加访问量
    await article.updateOne({_id:id},{$inc: { pv: 1 } })
    await article.find({_id:id})
        .exec().then(async(result)=>{
            ctx.body=result
        })
})

/*按分类查找全部文章*/
router.get('/category_Artices',async(ctx)=>{
    let name = ctx.query.name
    const article = mongoose.model('article')
    await article.find({type:name,publish:true})
        .exec().then(async(result)=>{
            ctx.body=result
        })
})

/*按分类分页查找文章*/
router.get('/category_ArticesByPage',async(ctx)=>{
    const article = mongoose.model('article')
    let query = ctx.query;
    await article.countDocuments({type:query.name,publish:true}, (error, count) => {}).then(async(count)=>{
        await article.find({type:query.name,publish:true}).skip((query.pageNo - 1) * query.pageSize).limit(parseInt(query.pageSize)||10) .sort("-date").exec().then(async(result)=>{
            ctx.body={
                status: 200,
                data: result,
                total: count,
                msg:'OK'
            }
        })
    })  
})

/*按标签查找全部文章*/
router.get('/tags_Artices',async(ctx)=>{
    let name = ctx.query.name
    const article = mongoose.model('article')
    await article.find({tag:name,publish:true})
        .exec().then(async(result)=>{
            ctx.body=result
        })
})

/*按标签分页查找文章*/
router.get('/tags_ArticesByPage',async(ctx)=>{
    const article = mongoose.model('article')
    let query = ctx.query;
    await article.countDocuments({tag:query.name,publish:true}, (error, count) => {}).then(async(count)=>{
        await article.find({tag:query.name,publish:true}).skip((query.pageNo - 1) * query.pageSize).limit(parseInt(query.pageSize)||10) .sort("-date").exec().then(async(result)=>{
            ctx.body={
                status: 200,
                data: result,
                total: count,
                msg:'OK'
            }
        })
    })  
})



module.exports =router