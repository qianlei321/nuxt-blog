const Router = require('koa-router')
const mongoose = require('mongoose')


let router = new Router()
/*获取所有标签*/
router.get('/getTag',async(ctx)=>{
  const tag = mongoose.model('tag')
  await tag.find().exec().then(async(result)=>{
    ctx.body={
      data:result,
    }
  })
})

/*存储文章*/
router.post('/saveArticle',async(ctx)=>{
  let data = ctx.request.body
  console.log(data)
  const Article = mongoose.model('article')
  let newArticle  = new Article({
    type: data.type,
    original: data.original,
    title: data.title,
    abstract: data.abstract,
    picture: data.picture,
    content: data.content,
    tag: data.tag,
    publish: data.publish,
    date: Date.now(),
    commentNum: 0,
    likeNum: 0,
    pv: 0
  })
  await newArticle.save().then(()=>{
      //添加标签到数据库
      const tag = mongoose.model('tag')
      if (Array.isArray(data.tag)) {
        data.tag.forEach((element)=>{
          tag.update({name: element}, {name:element,date:Date.now()},{upsert: true}).exec();
        })
      } else {
        tag.update({name: data.tag}, {name:data.tag,date:Date.now()},{upsert: true}).exec();
      }
      
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

/*更改文章*/
router.post('/editArticle',async(ctx)=>{
  let data = ctx.request.body
  //console.log(data)
  const Article = mongoose.model('article')
  await Article.updateOne({_id: data._id},data ).then(()=>{
      //添加标签到数据库
      const tag = mongoose.model('tag')
      if (Array.isArray(data.tag)) {
        data.tag.forEach((element)=>{
          tag.update({name: element}, {name:element,date:Date.now()},{upsert: true}).exec();
        })
      } else {
        tag.update({name: data.tag}, {name:data.tag,date:Date.now()},{upsert: true}).exec();
      }
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

/*文章-删除*/
router.delete('/deleteArtices',async(ctx)=>{
    let id = ctx.query.id
    const article = mongoose.model('article')
    await article.remove({_id:id}).then(async(result)=>{
      ctx.body={
        status:200,
        message:'删除成功'
      }
    });
})

/*查找文章*/
router.get('/searchArtices',async(ctx)=>{
  let select_word = ctx.query.select_word
    let pageNum  =  Number(ctx.query.pageNum)
    let pageSize  =  Number(ctx.query.pageSize)
    const article = mongoose.model('article')
      await article.find({"title":{$regex:select_word}}).count({}, function(err, count) {
      }).then(async(count)=>{
        await article.find({"title":{$regex:select_word}})
        .skip(pageSize*(pageNum-1))
        .limit(pageSize)
        .sort({'_id':-1})
        .exec().then(async(result)=>{
          ctx.body={
            data:result,
            total:count
          }
        })
      })
})

/*更改文章状态*/
router.post('/changePublish',async(ctx)=>{
  let data = ctx.request.body.data
  const article = mongoose.model('article')
  await article.updateOne({_id: data._id}, {publish:data.publish}, function(err, docs){
          if(err){
              ctx.body = {
                  message: '更改失败',
                  code: false
              }
          }else{
              ctx.body = {
                  message: '更改成功',
                  code: true
              }
          }
      })
})

module.exports =router