const Router = require("koa-router")
const router = new Router()
const jwt = require('jsonwebtoken')
const { returnMsg, queryFn, jwtVerify } = require('../../../utils')

//url is /article/list
router.post('/', async ctx=>{
    
    let sql = `SELECT COUNT(*) FROM artical`;
    let result = await queryFn(sql)
    let total = result[0]["COUNT(*)"];
    let {current, counts} = ctx.request.body
    if(!current|| !counts){
        ctx.body = returnMsg(1,'参数错误')
        return;
    }
    let sql1 = `SELECT * FROM artical LIMIT ${(current-1)*counts},${counts}`;
    let result1 = await queryFn(sql1)
    
    ctx.body = returnMsg(0,'查询成功', {
        current,counts,total,
        arr:result1
    })
    
}) 

module.exports = router; 