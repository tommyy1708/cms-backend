const Router = require("koa-router")
const router = new Router()
const fs = require("fs")
const path = require("path")
const mime = require("mime-types")// 引入读取文件库

router.get('/',async ctx => {
    let filePath = path.join(__dirname,"../../static/images/404.jpeg")//文件路径
    let file = fs.readFileSync(filePath)//用fs读取文件
    let mimeType = mime.lookup(filePath)//读取文件类型
    ctx.set("content-type", mimeType) // 设置返回类型(这一步重点❕)
    ctx.body = file
})

module.exports = router;