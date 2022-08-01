const Router = require("koa-router")
const router = new Router()
const jwt = require('jsonwebtoken')
const { returnMsg, queryFn, jwtVerify } = require('../../../utils')

//url is /article/info
router.post('/', async ctx=>{
    let {id} = ctx.request.body;
    let sql = `SELECT * FROM artical WHERE id='${id}'`
    let result=  await queryFn(sql)
    if(result.length>0){
        ctx.body = returnMsg(0,'获取文章成功',result[0])
    }else{
        ctx.body = returnMsg(-1,'获取文章失败')
    }
    
})

module.exports = router; 