const Router = require('koa-router')
const mongoose = require('mongoose')
var fs  = require('fs');
var path=require("path");
const send = require('koa-send');

let router = new Router()

/*文件-上传多个文件*/
router.post('/uploadfiles',async(ctx)=>{
  // 上传单个文件
  const file = ctx.request.files.file; // 获取上传文件
  // 创建可读流
  const reader = fs.createReadStream(file.path);
  //文件存储的文件夹路径
  let filePath=path.join(__dirname, '../../upload/');
  //文件路径,更改名称防止重名替换
  let time = new Date().getTime()
  let fileFormat  = (file.name).split(".");
  let newFileName = fileFormat.slice(0,fileFormat.length-1).join()+'-'+ new Date().getTime() + '.' +fileFormat.slice(fileFormat.length-1)
  let fileResource=filePath+`${newFileName}`;
  //下载路径,相对于项目根目录路的相对路径
  let downloadPath = `/server/upload/${newFileName}`
  //判断staic/upload文件夹是否存在，如果不存在就新建一个
  if(!fs.existsSync(filePath)){  
    fs.mkdir(filePath,async(err)=>{
      if(err){
        throw new Error(err)
      }
    })
    ctx.body={
        code:200,
        message:'文件夹已初始化,请重新上传'
      }
    }else{
    // 创建可写流
    const upStream = fs.createWriteStream(fileResource);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    //信息保存到数据库
    const FileData = mongoose.model('file')
    let filedata  = new FileData({
      fileName : file.name,
      path : fileResource,
      downloadPath:downloadPath,
      createTime:Date.now()
    })
    await filedata.save().then(()=>{
          ctx.body={
              code:200,
              message:'上传成功'
          }
      }).catch(error=>{
          ctx.body={
              code:500,
              message:error
          }
      })
  }
  
})
/*文件-下载*/
router.get('/download/:name',async(ctx)=>{ 
  const name = ctx.params.name;
  //路径为相对于项目根目录路的相对路径
  const downloadPath = ctx.query.downloadPath;
  ctx.attachment(downloadPath);
  await send(ctx, downloadPath);
})
/*文件-删除*/
router.delete('/deleteFile',async(ctx)=>{
    let id = ctx.query.id
    const File = mongoose.model('file')
    await File.remove({_id:id}).then(async(result)=>{
      ctx.body={
        status:200,
        message:'删除成功'
      }
    });
})
/*文件-查找*/
router.get('/searchFile',async(ctx)=>{
    let select_word = ctx.query.select_word
    let date  =  ctx.query.date
    let pageNum  =  Number(ctx.query.pageNum)
    let pageSize  =  Number(ctx.query.pageSize)
    const File = mongoose.model('file')
    if (typeof(date)=='undefined') {
      await File.find({"fileName":{$regex:select_word}}).count({}, function(err, count) {
      }).then(async(count)=>{
        await File.find({"fileName":{$regex:select_word}})
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
      
    }else{
      await File.find({"fileName":{$regex:select_word}})
      .where("createTime").gte(date[0]).lte(date[1]).count({}, function(err, count) {
      }).then(async(count)=>{
        await File.find({"fileName":{$regex:select_word}})
        .where("createTime").gte(date[0]).lte(date[1])
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
      
    }
})

/*文件-查找上传文件中的图片文件*/
router.get('/searchPictureFile',async(ctx)=>{
  const File = mongoose.model('file')
  // await File.find({"fileName":{$regex:/.png$/|/.jpg$/|/.jepg$/|/.gif$/}})
  // .sort({'_id':-1})
  // .exec().then(async(result)=>{
  //   ctx.body={
  //     data:result
  //   }
  // })
  await File.find()
  .sort({'_id':-1})
  .exec().then(async(result)=>{
    var res = []
    var reg=/(.*)\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$/; 
    result.forEach((element)=>{
      if(reg.test(element.fileName)){
        res.push(element)
      }
    })
    ctx.body={
      data:res
    }
  })
})
module.exports =router